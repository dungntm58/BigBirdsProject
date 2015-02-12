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
        $scope.dishes = [];
        $scope.quantity = [];

        $scope.selectDish = function(dish){
            var index = $scope.dishes.indexOf(dish);
            if (index >= 0){
                $scope.quantity[index]++;
            }
            else{
                $scope.dishes.push(dish);
                $scope.quantity.push(1);
            }
        };

        $scope.removeDish = function(dish){
            var index = $scope.dishes.indexOf(dish);
            $scope.dishes.splice(index, 1);
            $scope.quantity.splice(index, 1);
        };

        $scope.increaseQuantity = function(dish){
            var index = $scope.dishes.indexOf(dish);
            $scope.quantity[index]++;
        };

        $scope.valueOfOrder = function(){
            var total = 0;
            for (var i = 0; i<$scope.dishes.length ; i++){
                total += parseFloat($scope.dishes[i].price)*parseInt($scope.quantity[i]);
            }
            return total;
        }

        $scope.decreaseQuantity = function(dish){
            var index = $scope.dishes.indexOf(dish);
            if ($scope.quantity[index] > 0){
                $scope.quantity[index]--;
            }
            if ($scope.quantity[index] == 0)
                $scope.removeDish(dish);
        };
    });