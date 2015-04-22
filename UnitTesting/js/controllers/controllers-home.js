angular.module('MainApp.controllers.home', [])

.controller('HomeController', function ($scope, menuItems){
    $scope.navTitle = menuItems[0].text;
});