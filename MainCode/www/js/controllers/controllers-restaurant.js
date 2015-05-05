angular.module('MainApp.controllers.restaurant', [])
	.controller('RestaurantController', function ($scope, $http, $rootScope, $cookieStore, menuItems, RestaurantService) {
        $scope.navTitle = menuItems[1].text;
        $scope.selectRestaurant = function (rest){
        	if ($rootScope.restaurant !== rest){
				$cookieStore.remove('restaurant');
				$rootScope.restaurant = rest;
				$cookieStore.put('restaurant', rest);

				$scope.tmp = [];
				RestaurantService.reset();
				preparingData();
		    }
        }
        $scope.isSelected = function(rest){
        	return $rootScope.restaurant === rest;
        }

        $http.get('/Json/restaurants.json').success(function(data, status, headers, config) {
        	$scope.listOfRestaurants = data;
        }).error(function(data, status, headers, config){
          	$rootScope.$broadcast('Request Failed');
        });

        function preparingData(){
        	$http.get('Json/COD-' + $rootScope.restaurant.name + '.json').success(function (data, status, headers, config){
	        	RestaurantService.setCategoriesOfDishes(data);
	        	console.log("b: " + RestaurantService.getCategoriesOfDishes());
	        }).error(function(data, status, headers, config){
	          $rootScope.$broadcast('Request Failed');
	        });
	        console.log("a: " + RestaurantService.getCategoriesOfDishes());
	        for(var x = 0; x < RestaurantService.getCategoriesOfDishes().length; x++){
		        $http.get('Json/DinC-' + RestaurantService.getCategoriesOfDishes()[x] +'-'+ $rootScope.restaurant.name + '.json')
		        .success(function (data, status, headers, config){
		        	$scope.tmp.push({
		        		'name' : RestaurantService.getCategoriesOfDishes()[x],
		        		'content' : data
		        	});
		        }).error(function (data, status, headers, config){
		          $rootScope.$broadcast('Request Failed');
		        })
		    }
	        RestaurantService.setAllListOfDishes($scope.tmp);

		    $http.get('Json/Table-' + $rootScope.restaurant.name + '.json').success(function(data, status, headers, config) {
	        	RestaurantService.setUnorderedTable(data);
	        }).error(function(data, status, headers, config){
	          	$rootScope.$broadcast('Request Failed');
	        });
        }
    })