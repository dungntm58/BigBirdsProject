var orderControllers = angular.module('MainApp.controllers.order', []);

	orderControllers.controller('OrderController', function ($scope, $ionicModal, menuItems) {
        $scope.navTitle = menuItems[3].text;

        $ionicModal.fromTemplateUrl('templates/Main/Order/new-order-modal.html', function($ionicModal) {
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

    orderControllers.controller('NewOrder', function ($scope, $http, $rootScope, $ionicPopup, $timeout, RestaurantService){
        $scope.initialize = function(){
            $scope.order = {
                dishes: [],
                quantity: [],
                table: null,
                datetime: new Date(),
                restaurant: null
            };
            if ($rootScope.restaurant != null)
                $scope.order.restaurant = $rootScope.restaurant.name;
            else
                $scope.order.restaurant = null;

            $scope.Currency = RestaurantService.Currency;
            // updateTable();
        };

        $scope.initialize();
        $scope.$watch('order.datetime', function () {
            updateTable();
        });

        $scope.selectDish = function(dish){
            var index = $scope.order.dishes.indexOf(dish);

            if (index >= 0){
                if (!isNaN($scope.order.quantity[index]))
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
                total += parseFloat($scope.order.dishes[i].price)*parseInt($scope.order.quantity[i]);
            }
            return total;
        }

        $scope.decreaseQuantity = function(dish){
            var index = $scope.order.dishes.indexOf(dish);
            if ($scope.order.quantity[index] > 1)
                $scope.order.quantity[index]--;
        };

        $scope.emptyOrder = function(){
            $scope.order.dishes = [];
            $scope.order.quantity = [];
            $scope.order.table = null;
            $scope.order.datetime = new Date(); 
        }

        $scope.resetOrder = function(){
            $ionicPopup.confirm({
                title: '<b>Reset</b>',
                template: 'Do you want to reset?',
                cancelType: 'button-assertive'
            }).then(function(res){
                if (res){
                    $scope.emptyOrder();
                }
            });
        };

        $scope.orderTable = function(table){
            $scope.order.table = table;
        };

        $scope.isSelected = function(table){
            return $scope.order.table === table;
        }

        $scope.confirmOrder = function(){
            $ionicPopup.confirm({
                title: '<b>Confirm order</b>',
                template: 'Are you sure of your order?',
                okText: 'Confirm',
                cancelType: 'button-assertive'
            }).then(function(res){
                if(res){
                    if ($scope.order.dishes.length && $scope.order.table){
                        // $scope.emptyOrder();
                        //send order
                        RestaurantService.sendOrder(order);
                    }
                    else{
                        var warning = $ionicPopup.show({
                            title: '<b>Warning</b>',
                            template: 'Your order is not finished. Please check again!',
                        })
                        $timeout(function() {
                            warning.close();
                        }, 2000);
                    }
                }
            });
        };

        function updateTable(){
            $http.get('Json/Table-' + $rootScope.restaurant.name + '.json').success(function(data, status, headers, config) {
                $scope.tables = giveBackCorrespondingUnorderedTable($scope.order.datetime, data);
            }).error(function(data, status, headers, config){
                $rootScope.$broadcast('Request Failed');
            });
        }

        function giveBackCorrespondingUnorderedTable(time, data){
            function filterTime(time){
                if (time === undefined || time === null)
                    return -1;
                if (time.getHours() >= 0 && time.getHours() < 10)
                    return 0;
                else
                    if (time.getHours() >= 10 && time.getHours() < 13)
                        return 1;
                    else
                        if (time.getHours() >= 13 && time.getHours() < 17)
                            return 2;
                        else
                            if (time.getHours() >= 17 && time.getHours() < 19)
                                return 3;
                            else return 4;
            }

            var t;
            var f = filterTime(time);
            var res;
            if (time !== undefined && time !== null){
                for (var i = 0; i < data.length; i++){
                    if (time.getUTCDate().toString() == data[i].date.toString()){
                        if ((time.getUTCMonth() + 1).toString() == data[i].month.toString()){
                            if (time.getUTCFullYear().toString() == data[i].year.toString()){
                                t = data[i];
                                break;
                            }
                        }
                    }
                }

                if (t !== undefined){
                    for (var i = 0; i < t.setOfTables.length; i++){
                        if (f.toString() == t.setOfTables[i].instant.toString()){
                            res = t.setOfTables[i].tables;
                        }
                    }
                }
            }
            
            return res;
        }
    });

    orderControllers.controller('SlideController', function ($scope, $ionicSlideBoxDelegate){
        $scope.nextSlide = function() {
            $ionicSlideBoxDelegate.next();
        }

        $scope.prevSlide = function(){
            $ionicSlideBoxDelegate.previous();
        }
    });

    orderControllers.controller('MenuFoodTabController', function ($scope, $http, $rootScope){
        $scope.typeOfDish = {};

        $http.get('Json/COD-' + $rootScope.restaurant.name + '.json').success(function (data, status, headers, config){
            $scope.typeOfDish = data;
            // $scope.chosen = $scope.typeOfDish[0];
        }).error(function(data, status, headers, config){
          $rootScope.$broadcast('Request Failed');
        });

        $scope.isSet = function(check){
            return $scope.chosen === check;
        }

        $scope.setTab = function(tab){
            $scope.chosen = tab;
            $scope.list = {};
            $http.get('Json/DinC-' + $scope.chosen +'-'+ $rootScope.restaurant.name + '.json')
            .success(function (data, status, headers, config){
                $scope.list = data;
            }).error(function (data, status, headers, config){
              $rootScope.$broadcast('Request Failed');
            })
        }

        // $scope.$watch('chosen', function(){
        //     $scope.list = {};
        //     $http.get('Json/DinC-' + $scope.chosen +'-'+ $rootScope.restaurant.name + '.json')
        //     .success(function (data, status, headers, config){
        //         $scope.list = data;
        //     }).error(function (data, status, headers, config){
        //       $rootScope.$broadcast('Request Failed');
        //     })
        // })
    });

    orderControllers.controller('DatepickerCtrl', function ($scope) {
        $scope.today = function () {
            $scope.dt = new Date();
        };

        $scope.clear = function () {
            $scope.dt = null;
        };
        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };
        $scope.format = 'dd/MM/yyyy';
        $scope.dateOptions = {
            'starting-day': 1
        };
    });

    orderControllers.controller('TimepickerCtrl', function ($scope, $log) {
        $scope.show = {
            opened: false,
            text: "Choose Time"
        }
        $scope.toggleTime = function(){
            $scope.show.opened = !$scope.show.opened;
            if ($scope.show.opened)
                $scope.show.text = "Close Time";
            else
                $scope.show.text = "Choose Time";
        }
        $scope.mytime = new Date();

        $scope.hstep = 1;
        $scope.mstep = 15;

        $scope.ismeridian = true;
        $scope.toggleMode = function() {
            $scope.ismeridian = ! $scope.ismeridian;
        };

        $scope.clear = function() {
            $scope.dt = null;
        };
    });