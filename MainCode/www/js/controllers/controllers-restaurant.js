angular.module('MainApp.controllers.restaurant', [])
	.run(function ($rootScope, $state, $ionicPopup, CHANGE_STATE){
		$rootScope.$on(CHANGE_STATE.order, function ($event){
			event.preventDefault();
			if ($rootScope.restaurant == null){
				$ionicPopup.alert({
	                title: '<b>Warning</b>',
	                template: 'You did not select any restaurants!'
	            }).then(function(res){
					if (res){
						$state.go('restaurant');
					}
	            })
			}
			else
				$state.go(CHANGE_STATE.order);
		})

		$rootScope.$on(CHANGE_STATE.menu, function ($event){
			event.preventDefault();
			if ($rootScope.restaurant == null){
				$ionicPopup.alert({
	                title: '<b>Warning</b>',
	                template: 'You did not select any restaurants!'
	            }).then(function(res){
					if (res){
						$state.go('restaurant');
					}
	            })
			}
			else
				$state.go(CHANGE_STATE.menu);
		})
	})

	.controller('RestaurantController', function ($scope, $rootScope, menuItems) {
        $scope.navTitle = menuItems[3].text;
    });