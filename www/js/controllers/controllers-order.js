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

        $scope.Currency = '$';
        $scope.dishes = [$scope.Appetizers[0], $scope.MainCourses[0], $scope.Desserts[0], $scope.Drinks[0]];
        $scope.quantity = [1, 1, 1, 1];

        $scope.selectDish = function(dish){
            $scope.dishes.push(dish);
            $scope.quantity.push(0);
        };
        $scope.removeDish = function(dish){
            $scope.dishes.splice($scope.dishes.indexOf(dish), 1);
            $scope.quantity.splice($scope.quantity.indexOf(dish), 1);
        };
        $scope.valueOfOrder = function(){
            var value = 0;
            for (var i = 0; i < $scope.dishes.length; i++){
                value += parseFloat(dishes[i].price)*parseInt(quantity[i]);
            };
            return value;
        };
    });