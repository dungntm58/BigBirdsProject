angular.module('MainApp.controllers.menu', [])

	.controller('MenuController', function ($scope, CategoryService) {
        $scope.navTitle = CategoryService.get(2).text;

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