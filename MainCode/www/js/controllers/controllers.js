angular.module('MainApp.controllers',
	[
		'MainApp.controllers.signIn',
		'MainApp.controllers.home',
		'MainApp.controllers.order',
		'MainApp.controllers.menu',
		'MainApp.controllers.restaurant',
		'MainApp.controllers.setting',
		'ui.bootstrap'
	])

	.run(function ($rootScope, $state, $ionicPopup, CHANGE_STATE){
		$rootScope.currentUser = null;
		$rootScope.restaurant = null;
		$rootScope.start = false;

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

		$rootScope.$on('Request Failed', function (){
			$ionicPopup.alert({
                title: '<b>Warning</b>',
                template: 'Request failed. Please try again.'
            }).then(function(res){})
		})
	})

	.controller('CategoryController', function ($scope, $state, $rootScope, $ionicSideMenuDelegate, menuItems) {
        $scope.list = menuItems;
        $scope.goto = function(link){
        	// $ionicSideMenuDelegate.toggleLeft();
        	if (link == 'order' || link == 'menu')
        		$rootScope.$broadcast(link);
        	else
        		$state.go(link);
        }
    })