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
            		$rootScope.start = false;
            		$state.go('sign-in');
            	}
            })
		})
	})

	.controller('LoginController', function ($scope, $rootScope, $state, AUTH_EVENTS, $cookieStore) {
		$scope.googleLogin = function () {
			function onLoadCallback() {
	            gapi.client.setApiKey('AIzaSyA3XT0udhWLXuShK87bHK21c-bPX-bYR7g');
	            gapi.client.load('plus', 'v1', function () {});
	        }
		    var myParams = {
	            'clientid': '415716996892-9t4qjhqm2317t1b2ffee7tjgr355pqnl.apps.googleusercontent.com',
	            'cookiepolicy': 'single_host_origin',
	            'callback': loginCallback,
	            'approvalprompt': 'force',
	            'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
	        };
	        gapi.auth.signIn(myParams);

	        function loginCallback(result) {
	            if (result['status']['signed_in']) {
	                var request = gapi.client.plus.people.get({'userId': 'me'});
	                request.execute(function (resp) {
	                    console.log('Google+ Login RESPONSE: ' + angular.toJson(resp));
	                    var userEmail;
	                    if (resp['emails']) {
	                        for (var i = 0; i < resp['emails'].length; i++) {
	                            if (resp['emails'][i]['type'] == 'account') {
	                                userEmail = resp['emails'][i]['value'];
	                            }
	                        }
	                    }
	                    // store data to DB
	                    var user = {};
	                    user.name = resp.displayName;
	                    user.email = userEmail;
	                    if(resp.gender) {
	                        resp.gender.toString().toLowerCase() === 'male' ? user.gender = 'M' : user.gender = 'F';
	                    } else {
	                        user.gender = '';
	                    }
	                    user.profilePic = resp.image.url;
	                    $cookieStore.put('userInfo', user);
	                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
	                });
	            }
	        }
		};

		$scope.facebookLogin = function (){
			FB.login(function (response) {
	            if (response.authResponse) {
	                getUserInfo();
	            } else {
	                console.log('User cancelled login or did not fully authorize.');
	            }
	        }, {scope: 'email,user_photos,user_videos'});

	        function getUserInfo() {
	            // get basic info
	            FB.api('/me', function (response) {
	                console.log('Facebook Login RESPONSE: ' + angular.toJson(response));
	                // get profile picture
	                FB.api('/me/picture?type=normal', function (picResponse) {
	                    console.log('Facebook Login RESPONSE: ' + picResponse.data.url);
	                    response.imageUrl = picResponse.data.url;
	                    // store data to DB - Call to API
	                    // Todo
	                    // After posting user data to server successfully store user data locally
	                    var user = {};
	                    user.name = response.name;
	                    user.email = response.email;
	                    if(response.gender) {
	                        response.gender.toString().toLowerCase() === 'male' ? user.gender = 'M' : user.gender = 'F';
	                    } else {
	                        user.gender = '';
	                    }
	                    user.profilePic = picResponse.data.url;
	                    $cookieStore.put('userInfo', user);
	                    $rootScope.currentUser = user;
	                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
	                });
	            });
	        }
		}
	})

	.controller('LogoutController', function ($scope, $state, $ionicPopup, $ionicSideMenuDelegate, $cookieStore){
		$scope.logOut = function(){
			$ionicPopup.confirm({
				title: '<b>Log out</b>',
                template: 'Do you want to log out?',
                cancelType: 'button-assertive'
            }).then(function(res){
                if (res){
                	$ionicSideMenuDelegate.toggleRight();
                	$cookieStore.remove('userInfo');
                	$rootScope.currentUser = null;
                	$rootScope.start = false;
                    $state.go('sign-in');
                }
            });
		};
	})