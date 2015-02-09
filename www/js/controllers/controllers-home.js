angular.module('MainApp.controllers.home', [])

	.controller('HomeController', function($scope, MenuService){
        $scope.navTitle = MenuService.get(0).text;

        $scope.leftButtons = [{
            type: 'button-icon icon ion-navicon',
            tap: function(e) {
                $scope.sideMenuController.toggleLeft();
            }
        }];
        $scope.rightButtons = [{
            type: 'button-icon icon ion-gear-b',
            tap: function(e){
                $scope.sideMenuController.toggleRight();
            }
        }];
    });