var orderControllers = angular.module('MainApp.controllers.order', [])

	orderControllers.controller('OrderController', function ($scope, $ionicModal, CategoryService) {
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
            $scope.modal.show();
        };

        $scope.closeModal = function(){
            $scope.modal.hide();
        };
    });

    orderControllers.controller('NewOrder', function($scope, MenuFoodService){
        $scope.Appetizers = MenuFoodService.appetizers();
        $scope.MainCourses = MenuFoodService.mainCourses();
        $scope.Desserts = MenuFoodService.desserts();
        $scope.Drinks = MenuFoodService.drinks();
        $scope.Currency = '$';

        $scope.order = {
            dishes: [],
            quantity: [],
            table: null,
            date: null
        };

        $scope.selectDish = function(dish){
            var index = $scope.order.dishes.indexOf(dish);

            if (index >= 0){
                if ($scope.order.quantity[index] != null)
                    $scope.order.quantity[index]++;
                else
                    $scope.order.quantity[index] = 1;
            }
            else{
                $scope.order.dishes.push(dish);
                $scope.order.quantity.push(1);
            }
        };

        $scope.removeDish = function(dish){
            var index = $scope.order.dishes.indexOf(dish);
            $scope.order.dishes.splice(index, 1);
            $scope.order.quantity.splice(index, 1);
        };

        $scope.increaseQuantity = function(dish){
            var index = $scope.order.dishes.indexOf(dish);
            $scope.order.quantity[index]++;
        };

        $scope.valueOfOrder = function(){
            var total = 0;
            for (var i = 0; i<$scope.order.dishes.length ; i++){
                if ($scope.order.quantity[i] != null)
                    total += parseFloat($scope.order.dishes[i].price)*parseInt($scope.order.quantity[i]);
            }
            return total;
        }

        $scope.decreaseQuantity = function(dish){
            var index = $scope.order.dishes.indexOf(dish);
            $scope.order.quantity[index]--;
            if ($scope.order.quantity[index] == 0)
                $scope.removeDish(dish);
        };

        $scope.resetOrder = function(){
            $scope.order.dishes = [];
            $scope.order.quantity = [];
            $scope.order.table = null;
            $scope.order.date = null;
        };
    });