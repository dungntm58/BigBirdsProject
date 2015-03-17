angular.module('MainApp.controllers.home', [])

.controller('HomeController', function($scope, CategoryService){
    $scope.navTitle = CategoryService.get(0).text;
});