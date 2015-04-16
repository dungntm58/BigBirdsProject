angular.module('MainApp.controllers',
	[
		'MainApp.controllers.signIn',
		'MainApp.controllers.home',
		'MainApp.controllers.order',
		'MainApp.controllers.menu',
		'MainApp.controllers.restaurant',
		'MainApp.controllers.setting'
	])

	.run(function ($rootScope){
		$rootScope.currentUser = null;
		$rootScope.restaurant = 'Gi do';
	})

	.controller('CategoryController', function ($scope, $state, $rootScope, $ionicSideMenuDelegate, menuItems) {
        $scope.list = menuItems;
        $scope.goto = function(link){
        	// $ionicSideMenuDelegate.toggleLeft();
        	if (link == menuItems[1].link || link == menuItems[2].link)
        		$rootScope.$broadcast(link);
        	else
        		$state.go(link);
        }
    })