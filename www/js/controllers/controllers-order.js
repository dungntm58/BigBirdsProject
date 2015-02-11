var orderControllers = angular.module('MainApp.controllers.order', [])

	orderControllers.controller('OrderController', function ($scope, $ionicModal, CategoryService, MenuFoodService) {
        $scope.navTitle = CategoryService.get(1).text;

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

        $ionicModal.fromTemplateUrl('templates/new-order-modal.html', function($ionicModal) {
                $scope.modal = $ionicModal;
            },
            {
                scope: $scope,
                animation: 'slide-in-up'
            }
        );
      
        $scope.openModal = function() {
            // console.log('Opening Modal');
            $scope.modal.show();
        };

        $scope.closeModal = function(){
            $scope.modal.hide();
        };

        $scope.Appetizers = MenuFoodService.appetizers();
        $scope.MainCourses = MenuFoodService.mainCourses();
        $scope.Desserts = MenuFoodService.desserts();
        $scope.Drinks = MenuFoodService.drinks();

        $scope.orderTemplate = [{

        }];
    });