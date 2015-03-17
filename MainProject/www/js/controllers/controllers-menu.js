angular.module('MainApp.controllers.menu', [])

.controller('MenuController', function ($scope, CategoryService) {
    $scope.navTitle = CategoryService.get(2).text;
});