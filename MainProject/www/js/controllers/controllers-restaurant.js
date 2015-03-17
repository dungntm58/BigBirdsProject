angular.module('MainApp.controllers.restaurant', [])

	.controller('RestaurantController', function ($scope, CategoryService) {
        $scope.navTitle = CategoryService.get(3).text;
    });