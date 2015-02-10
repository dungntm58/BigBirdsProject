angular.module('MainApp.controllers.order', [])

	.controller('OrderController', function ($scope, $ionicModal, MenuService) {
        

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

        $ionicModal.fromTemplateUrl('templates/new-order-modal.html', function($ionicModal) {
            $scope.modal = $ionicModal;}, {
            scope: $scope,
            animation: 'slide-in-up'
        });
      
        $scope.openModal = function() {
            // console.log('Opening Modal');
            $scope.modal.show();
        };

        $scope.closeModal = function(){
            $scope.modal.hide();
        };
    });