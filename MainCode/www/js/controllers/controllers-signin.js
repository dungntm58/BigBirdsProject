angular.module('MainApp.controllers.signIn', [])
	.run(function ($rootScope, $ionicPopup, $timeout, $state, AUTH_EVENTS, AccountService) {
		$rootScope.$on('$stateChangeStart', function ($event) {
			event.preventDefault();
			if (!AccountService.isAuthenticated()) {
				// user is not logged in
				$rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
			}
		});

		$rootScope.$on(AUTH_EVENTS.loginFailed, function ($event){
			event.preventDefault();
			$ionicPopup.alert({
                title: '<b>Sign up</b>',
                template: 'Sign up failed. Please check your info or connecting network'
            });
		});

		$rootScope.$on(AUTH_EVENTS.loginSuccess, function ($event){
			event.preventDefault();
			$state.go('home');
		});
	})

	.controller('LoginController', function ($scope, $rootScope, $state, AUTH_EVENTS, AccountService) {
		$scope.credentials = {
			username: null,
			password: null
		};

		$scope.signIn = function () {
			// $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
			AccountService.login($scope.credentials).then(function (user) {
				$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
				$rootScope.currentUser = user;
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
                	AccountService.logout();
                    $state.go('sign-in');
                }
            });
		};
	})