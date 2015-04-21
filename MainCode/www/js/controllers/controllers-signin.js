angular.module('MainApp.controllers.signIn', [])
	.run(function ($rootScope, $ionicPopup, $timeout, $state, AUTH_EVENTS) {
		$rootScope.$on('$stateChangeStart', function ($event) {
			event.preventDefault();
			if ($rootScope.currentUser == null && $rootScope.start == true) {
				$rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
			}
		});

		$rootScope.$on(AUTH_EVENTS.loginFailed, function ($event){
			event.preventDefault();
			$ionicPopup.alert({
                title: '<b>Sign in</b>',
                template: 'Sign in failed. Please check your network connection'
            });
		});

		$rootScope.$on(AUTH_EVENTS.loginSuccess, function ($event){
			event.preventDefault();
			$rootScope.start = true;
			$state.go('home');
		});

		$rootScope.$on(AUTH_EVENTS.notAuthenticated, function ($event){
			event.preventDefault();
			$ionicPopup.alert({
                title: '<b>Warning</b>',
                template: 'You dont have a permisson. Please login before'
            }).then(function (res){
            	if (res){
            		$state.go('sign-in');
            	}
            })
		})
	})

	.controller('LoginController', function ($scope, $rootScope, $state, AUTH_EVENTS, $cordovaOauth) {
		$scope.googleLogin = function () {
		    $cordovaOauth.google("415716996892-9t4qjhqm2317t1b2ffee7tjgr355pqnl.apps.googleusercontent.com",
	    		"https://www.googleapis.com/auth/plus.login"
		    )
		    .then(function (result) {
		    	$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
		        console.log(JSON.stringify(result));
		    }, function (error) {
		    	$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
		        console.log(error);
		    });
		};

		$scope.facebookLogin = function (){
			$cordovaOauth.facebook("",
				""
			)
			.then(function (result) {
				$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
		        console.log(JSON.stringify(result));
			}, function (error) {
				$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
		        console.log(error);
			});
		}
	})

	.controller('LogoutController', function ($scope, $state, $ionicPopup, $ionicSideMenuDelegate){
		$scope.logOut = function(){
			//more code
			$ionicPopup.confirm({
				title: '<b>Log out</b>',
                template: 'Do you want to log out?',
                cancelType: 'button-assertive'
            }).then(function(res){
                if (res){
                	$ionicSideMenuDelegate.toggleRight();
                	$rootScope.currentUser = null;
                	$rootScope.start = false;
                    $state.go('sign-in');
                }
            });
		};
	})