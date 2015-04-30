angular.module('MainApp.controllers.restaurant', [])
	.controller('RestaurantController', function ($scope, $rootScope, $cookieStore, menuItems, RestaurantService) {
        $scope.navTitle = menuItems[1].text;
   //      $scope.listOfRestaurants = RestaurantService.restaurants();
   //      $scope.selectRestaurant = function (rest){
   //      	if ($cookieStore.get('restaurant') !== rest){
			// 	$cookieStore.remove('restaurant');
			// 	$rootScope.restaurant = rest;
			// 	$cookieStore.put('restaurant', rest);
			// 	RestaurantService.getFood();
			// }
   //      }
    })