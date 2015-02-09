angular.module('MainApp.controllers.restaurant', [])

	.controller('RestaurantController', function ($scope, MenuService) {
        $scope.navTitle = MenuService.get(3).text;

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