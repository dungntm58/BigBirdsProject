angular.module('MainApp.controllers.restaurant', [])
	.controller('RestaurantController', function ($scope, $state, $http, $rootScope, $cookieStore, $ionicPopup, URL_SERVER) {
        $scope.selectRestaurant = function (rest){
        	if ($rootScope.restaurant !== rest){
				$cookieStore.remove('restaurant');
				$rootScope.restaurant = rest;
				$cookieStore.put('restaurant', rest);

				$ionicPopup.confirm({
	                title: '<b>Notification</b>',
	                template: "You've selected " + $rootScope.restaurant.restaurant_name + ".<br/>Do you want to order?",
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
			url: URL_SERVER.url + 'Search_Res.php',
			headers: {
				'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept",
				'Access-Control-Allow-Origin': '*',
				'Content-Type' : 'application/json'
			}
		}).success(function(data, status, headers, config) {
        	$scope.listOfRestaurants = data;
        }).error(function(data, status, headers, config){
          	$rootScope.$broadcast('Request Failed');
        });

        $scope.openDetailRes = function(rest){
        	$ionicPopup.confirm({
                title: '<b>' + rest.restaurant_name + '</b>',
                template: 'Detail!',
                okText: 'Select'
            }).then(function (res){
                if (res){
                    $scope.selectRestaurant(rest)
                }
            })
        }
    })