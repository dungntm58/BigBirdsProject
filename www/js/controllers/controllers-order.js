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
        $scope.dishes = [$scope.Appetizers[0], $scope.MainCourses[1], $scope.Desserts[2], $scope.Drinks[1]];
        $scope.quantity = [1, 2, 2, 1];

        $scope.selectDish = function(dish){
            $scope.dishes.push(dish);
            $scope.quantity.push(1);
        };
        $scope.removeDish = function(dish){
            var index = $scope.dishes.indexOf(dish);
            $scope.dishes.splice(index, 1);
            $scope.quantity.splice(index, 1);
        };
        $scope.valueOfOrder = function(){
            var total = 0.0;
            for (var i = 0; i < $scope.dishes.length; i++){
                total += parseFloat($scope.dishes[i].price)*parseInt($scope.quantity[i]);
            };
            return total;
        };
        $scope.increaseQuantity = function(dish){
            var index = $scope.dishes.indexOf(dish);
            $scope.quantity[index]++;
        };

        $scope.decreaseQuantity = function(dish){
            var index = $scope.dishes.indexOf(dish);
            if ($scope.quantity[index] > 0)
                $scope.quantity[index]--;
            if ($scope.quantity[index] == 0)
                $scope.removeDish(dish);
        };
    });