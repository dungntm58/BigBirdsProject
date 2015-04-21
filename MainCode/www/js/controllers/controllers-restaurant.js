angular.module('MainApp.controllers.restaurant', [])
	.controller('RestaurantController', function ($scope, $rootScope, menuItems, RestaurantService) {
        $scope.navTitle = menuItems[1].text;
        // $scope.listOfRestaurants = RestaurantService.restaurants();
        // $scope.selectRestaurant = function (restaurant){
        // 	$rootScope.restaurant = restaurant;
        // 	RestaurantService.getFood(restaurant);
        // }
    })