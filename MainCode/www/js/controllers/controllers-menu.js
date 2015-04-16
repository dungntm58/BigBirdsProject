angular.module('MainApp.controllers.menu', [])

.controller('MenuController', function ($scope, menuItems) {
    $scope.navTitle = menuItems[2].text;
});