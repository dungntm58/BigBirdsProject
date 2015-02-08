angular.module('MainApp.controllers', [])

    .controller('CategoryController', function ($scope, $location, MenuService) {
        // "MenuService" is a service returning mock data (services.js)
        $scope.list = MenuService.all();

        $scope.goTo = function(page) {
            console.log('Going to ' + page);
            $scope.sideMenuController.toggleLeft();
            $location.url('/' + page);
        };
    })

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
    })

    .controller('OrderController', function ($scope, MenuService) {
        $scope.navTitle = MenuService.get(1).text;

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
    })

    .controller('MenuController', function ($scope, MenuService) {
        $scope.navTitle = MenuService.get(2).text;

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
    })

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
