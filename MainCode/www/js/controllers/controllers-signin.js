angular.module('MainApp.controllers.signIn', [])
	.run(function($rootScope, $ionicLoading) {
		$rootScope.$on('$ionicView.beforeEnter', function(){
			$ionicLoading.show({
				template: 'Loading...',
	            animation: 'fade-in',
	            showBackdrop: false,
	            maxWidth: 200
    		});
		});

		$rootScope.$on('$ionicView.enter', function(){
			$ionicLoading.hide();
		});
	})

	.run(function ($rootScope, AUTH_EVENTS, AccountService) {
		$rootScope.$on('$stateChangeStart', function ($event, next) {
			// var AuthorizedRoles = next.views.authentication.data.authorizedRoles;
			// if (!AccountService.isAuthorized(AuthorizedRoles)) {
				event.preventDefault();
				if (!AccountService.isAuthenticated()) {
					// user is not allowed
					// $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
				// } else {
					// user is not logged in
					$rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
				}
			// }
		});
	})

	.controller('LoginController', function ($scope, $rootScope, $state, AUTH_EVENTS, USER_ROLES, AccountService) {
		$scope.credentials = {
			username: null,
			password: null
		};
		$scope.currentUser = null;
		$scope.userRoles = USER_ROLES;
		$scope.isAuthorized = AccountService.isAuthorized;
		$scope.setCurrentUser = function (user) {
		    $scope.currentUser = user;
	  	};
		$scope.signIn = function () {
			AccountService.login($scope.credentials).then(function (user) {
				$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
				$scope.setCurrentUser(user);
				$state.go('home');
			}, function () {
				$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
			});
		};
		$scope.signUp = function(){
			$state.go('sign-up');
		};
	})

	.controller('SignUpController', function ($scope, $state){
		$scope.account = {
			username : null,
			password : null,
			email : null
		};
		$scope.back = function(){
			$state.go('sign-in');
		};

		$scope.signUp = function(){
			//code here
		}
		$scope.check = function(){
			//code here
			return true;
		}
	})

	.controller('LogoutController', function ($scope, $state, $ionicPopup, $ionicSideMenuDelegate, AccountService){
		$scope.logOut = function(){
			//more code
			$ionicPopup.confirm({
				title: '<b>Log out</b>',
                template: 'Do you want to log out?',
                cancelType: 'button-assertive'
            }).then(function(res){
                if (res){
                	$ionicSideMenuDelegate.toggleRight();
                    $state.go('sign-in');
                }
            });
			
		};
	})

   	.controller('CategoryController', function ($scope, $state, $ionicSideMenuDelegate, CategoryService) {
        $scope.list = CategoryService.all();
        $scope.goto = function(link){
        	// $ionicSideMenuDelegate.toggleLeft();
        	$state.go(link);
        }
    });