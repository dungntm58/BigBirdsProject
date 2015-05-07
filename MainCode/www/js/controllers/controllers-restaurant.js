angular.module('MainApp.controllers.restaurant', [])
	.controller('RestaurantController', function ($scope, $state, $http, $rootScope, $cookieStore, $ionicPopup) {
        $scope.selectRestaurant = function (rest){
        	if ($rootScope.restaurant !== rest){
				$cookieStore.remove('restaurant');
				$rootScope.restaurant = rest;
				$cookieStore.put('restaurant', rest);

				$ionicPopup.confirm({
	                title: '<b>Notification</b>',
	                template: "You've selected " + $rootScope.restaurant.name + ".<br/>Do you want to order?",
	                cancelType: 'button-assertive'
	            }).then(function(res){
	                if (res){
	                    $state.go('order');
	                }
	            });
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
    })