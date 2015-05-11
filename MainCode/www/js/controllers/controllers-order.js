angular.module('MainApp.controllers.order', [])

    .controller('NewOrder', function ($scope, $http, $rootScope, $ionicPopup, URL_SERVER, RestaurantService){
        $scope.initialize = function(){
            $scope.order = {
                dishes: [],
                // quantity: [],
                table: null,
                // datetime: new Date(),
                restaurant: null
            }
            $scope.data = {
                dishes: [],
                quantity: [],
                table: null,
                datetime: new Date(),
                restaurant: null
            }
            if ($rootScope.restaurant != null){
                $scope.order.restaurant = $rootScope.restaurant.restaurant_name;
                $scope.data.restaurant = $rootScope.restaurant.res_id;
            }
            else
                $scope.order.restaurant = null;

            $scope.Currency = RestaurantService.Currency;
        }
        
        $scope.initialize();
        $scope.$watch('data.datetime', function () {
            updateTable();
        })

        $scope.selectDish = function(dish){
            var index = -1;
            for (var i = 0; i < $scope.order.dishes.length; i++){
                if (dish.pro_id == $scope.order.dishes[i].pro_id){
                    index = i;
                    break;
                }
            }
            
            if (index >= 0){
                if (!isNaN($scope.data.quantity[index]))
                    $scope.data.quantity[index]++;
                else
                    $scope.data.quantity[index] = 1;
            }
            else{
                $scope.order.dishes.push(dish);
                $scope.data.quantity.push(1);
            }
        }

        $scope.removeDish = function(dish){
            var index = $scope.order.dishes.indexOf(dish);
            $scope.order.dishes.splice(index, 1);
            $scope.data.quantity.splice(index, 1);
        }

        $scope.increaseQuantity = function(dish){
            var index = $scope.order.dishes.indexOf(dish);
            $scope.data.quantity[index]++;
        }

        $scope.valueOfOrder = function(){
            var total = 0;
            for (var i = 0; i<$scope.order.dishes.length ; i++){
                total += parseFloat($scope.order.dishes[i].pro_price)*parseInt($scope.data.quantity[i]);
            }
            return total;
        }

        $scope.decreaseQuantity = function(dish){
            var index = $scope.order.dishes.indexOf(dish);
            if ($scope.data.quantity[index] > 1)
                $scope.data.quantity[index]--;
        }

        function emptyOrder(){
            $scope.order.dishes = [];
            $scope.data.quantity = [];
            $scope.order.table = null;
            $scope.data.datetime = new Date();
        }

        $scope.resetOrder = function(){
            $ionicPopup.confirm({
                title: '<b>Reset</b>',
                template: 'Do you want to reset?',
                cancelType: 'button-assertive'
            }).then(function(res){
                if (res){
                    emptyOrder();
                }
            });
        }

        $scope.orderTable = function(table){
            $scope.order.table = table;
        }

        $scope.isSelected = function(table){
            return $scope.order.table === table;
        }

        $scope.confirmOrder = function(){
            var confirm = $ionicPopup.confirm({
                title: '<b>Confirm order</b>',
                template: 'Are you sure of your order?',
                okText: 'Confirm',
                cancelType: 'button-assertive'
            }).then(function (res){
                if(res){
                    if ($scope.order.dishes.length && $scope.order.table){
                        for (var i = 0; i< $scope.order.dishes.length; i++){
                            $scope.data.dishes.push($scope.order.dishes[i].pro_id);
                        }
                        $scope.data.table = $scope.order.table.table_id;
                        //send order
                        RestaurantService.sendOrder($scope.data);
                    }
                    else{
                        $ionicPopup.alert({
                            title: '<b>Warning</b>',
                            template: 'Your order is not finished. Please check again!'
                        });
                    }
                }
            });
        }

        function updateTable(){
            if ($scope.data.datetime != null){
                var _date = {
                    dateUTC : $scope.data.datetime.getDate(),
                    monthUTC : $scope.data.datetime.getMonth(),
                    yearUTC: $scope.data.datetime.getFullYear()
                }
                var _time = {
                    hourUTC: $scope.data.datetime.getHours(),
                    minuteUTC: $scope.data.datetime.getMinutes(),
                    secondUTC: $scope.data.datetime.getSeconds()
                }
                var datetimeString = _date.yearUTC + "-" + _date.monthUTC + "-" + _date.dateUTC + " " + _time.hourUTC + ":" + _time.minuteUTC + ":" + _time.secondUTC;
                $http({
                    method: 'POST',
                    url: URL_SERVER.url + 'Search_tbl.php',
                    headers: {
                        'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept",
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type' : 'application/json'
                    },
                    data: [{
                            'resID' : $scope.data.restaurant,
                            'datetime' : datetimeString
                        }]
                }).success(function(data, status, headers, config) {
                    $scope.tables = data;
                }).error(function(data, status, headers, config){
                    $rootScope.$broadcast('Request Failed');
                })
            }
        }
    })

    .controller('SlideController', function ($scope, $ionicSlideBoxDelegate){
        $scope.disableSwipe = function() {
            $ionicSlideBoxDelegate.enableSlide(false);
        }

        $scope.nextSlide = function() {
            $ionicSlideBoxDelegate.next();
        }

        $scope.prevSlide = function(){
            $ionicSlideBoxDelegate.previous();
        }
    })

    .controller('MenuFoodTabController', function ($scope, $http, $rootScope, $ionicPopup, URL_SERVER){
        $scope.typeOfDish = {};

        $http({
            method: 'POST',
            url: URL_SERVER.url + 'Search_ctl.php',
            headers: {
                'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept",
                'Access-Control-Allow-Origin': '*',
                'Content-Type' : 'application/json'
            },
            data: [{'resID' : $rootScope.restaurant.user_id}]
        }).success(function (data, status, headers, config){
            $scope.typeOfDish = data;
            // console.log(data);
            // $scope.chosen = $scope.typeOfDish[0];
        }).error(function (data, status, headers, config){
          $rootScope.$broadcast('Request Failed');
        })

        $scope.isSet = function(check){
            return $scope.chosen === check;
        }

        $scope.setTab = function(tab){
            $scope.chosen = tab;
            $scope.list = {};
            $http({
                method: 'POST',
                url: URL_SERVER.url + 'Search_Pro.php',
                headers: {
                    'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept",
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type' : 'application/json'
                },
                data: [{'ctlID' : tab.ctl_id}]
            }).success(function (data, status, headers, config){
                $scope.list = data;
                console.log(data);
            }).error(function (data, status, headers, config){
              $rootScope.$broadcast('Request Failed');
            })
        }

        $scope.openDetail = function (dish){
            $ionicPopup.alert({
                title: '<b>' + dish.name + '</b>',
                template: 'Detail!'
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
    })

    .controller('DatepickerCtrl', function ($scope) {
        $scope.today = function () {
            $scope.dt = new Date();
        }

        $scope.clear = function () {
            $scope.dt = null;
        }
        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        }
        $scope.format = 'dd/MM/yyyy';
        $scope.dateOptions = {
            'starting-day': 1
        }
    })

    .controller('TimepickerCtrl', function ($scope, $log) {
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
        }

        $scope.clear = function() {
            $scope.dt = null;
        }
    })