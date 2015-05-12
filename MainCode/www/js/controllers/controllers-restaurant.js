angular.module('MainApp.controllers.restaurant', [])
	.controller('RestaurantController', function ($scope, $state, $http, $rootScope, URL_SERVER) {
        $scope.isSelected = function(rest){
        	return $rootScope.restaurant === rest;
        }

        $http({
        	method: 'POST',
			url: URL_SERVER.url + 'Search_Res.php',
			headers: {
				'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept",
				'Access-Control-Allow-Origin': '*',
				'Content-Type' : 'application/json'
			}
		}).success(function(data, status, headers, config) {
        	$scope.listOfRestaurants = data;
        }).error(function(data, status, headers, config){
            $scope.listOfRestaurants = [];
          	$rootScope.$broadcast('Request Failed');
        });

        $scope.load = function(){
            $http({
                method: 'POST',
                url: URL_SERVER.url + 'Search_Res.php',
                headers: {
                    'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept",
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type' : 'application/json'
                }
            }).success(function(data, status, headers, config) {
                $scope.listOfRestaurants = data;
            }).error(function(data, status, headers, config){
                $scope.listOfRestaurants = [];
                $rootScope.$broadcast('Request Failed');
            })

            $scope.$broadcast('scroll.refreshComplete');
            $scope.$apply();
        }

        $scope.openDetailRes = function(rest){
            $state.go('restaurantInfo');
            $rootScope.tmpRest = rest;
        }
    })

    .controller('RestaurantInfo', function ($scope, $state, $rootScope, $cookieStore){
        $scope.backToSelectRestaurant = function(){
            $rootScope.tmpRest = {};
            $state.go('restaurant');
        }
        $scope.selectRestaurant = function(){
            if ($rootScope.restaurant !== $rootScope.tmpRest){
                $cookieStore.remove('restaurant');
                $rootScope.restaurant = $rootScope.tmpRest;
                $cookieStore.put('restaurant', $rootScope.tmpRest);
            }

            $rootScope.tmpRest = {};
            $state.go('order');
            // $state.reload();
        }
    })