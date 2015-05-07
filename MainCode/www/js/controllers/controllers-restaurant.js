angular.module('MainApp.controllers.restaurant', [])
	.controller('RestaurantController', function ($scope, $state, $http, $rootScope, $cookieStore, $ionicPopup, URL_SERVER) {
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

        $http({
        	method: 'POST',
			url: URL_SERVER.local + 'Search_Res.php',
			headers: {
				'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept",
				'Access-Control-Allow-Origin': '*',
				'Content-Type' : undefined
			}
		}).success(function(data, status, headers, config) {
        	$scope.listOfRestaurants = data;
        }).error(function(data, status, headers, config){
          	$rootScope.$broadcast('Request Failed');
        });
    })