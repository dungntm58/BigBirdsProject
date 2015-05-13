angular.module('MainApp.controllers.signIn', [])
	.run(function ($rootScope, $ionicPopup, $timeout, $state, AUTH_EVENTS) {
		$rootScope.$on('$stateChangeStart', function ($event) {
			// event.preventDefault();
			if ($rootScope.currentUser == null && $rootScope.start == true) {
				$rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
			}
		});

		$rootScope.$on(AUTH_EVENTS.loginFailed, function ($event){
			// event.preventDefault();
			$ionicPopup.alert({
                title: '<b>Sign in</b>',
                template: 'Sign in failed. Please check your network connection'
            });
		});

		$rootScope.$on(AUTH_EVENTS.loginSuccess, function ($event){
			// event.preventDefault();
			$rootScope.start = true;
			$state.go('home');
		});

		$rootScope.$on(AUTH_EVENTS.notAuthenticated, function ($event){
			// event.preventDefault();
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
		$scope.purpose = function(){
			$rootScope.currentUser = {
				name: 'User',
				email: 'abc@domain',
				image: {
					url: '/img/ionic.png'
				},
				gender: 'Undefined',
				age: 'Undefined'
			}
			$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);

			// console.log($rootScope.currentUser);
		}
		$scope.googleLogin = function () {
		    var params = {
	            'clientid': '415716996892-9t4qjhqm2317t1b2ffee7tjgr355pqnl.apps.googleusercontent.com',
	            'cookiepolicy': 'single_host_origin',
	            'callback': loginCallback,
	            'approvalprompt': 'force',
	            'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read https://www.googleapis.com/auth/plus.me'
	        };
	        gapi.auth.signIn(params);

	        function loginCallback(result) {
	            if (result['status']['signed_in']) {
	                var request = gapi.client.plus.people.get({'userId': 'me'});
	                request.execute(function (resp) {
	                    // console.log('Google+ Login RESPONSE: ' + angular.toJson(resp));
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
	                    user.type = 'Gg';
	                    user.name = resp.displayName;
	                    user.email = userEmail;
	                    user.image = resp.image;
	                    user.age = resp.ageRange.max;
	                    user.gender = resp.gender;
	                    
	                    $cookieStore.put('userInfo', user);
	                    $rootScope.currentUser = user;
	                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
	                });
	            }
	        }

	        // console.log($rootScope.currentUser);
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
	                // console.log('Facebook Login RESPONSE: ' + angular.toJson(response));
	                // get profile picture
	                FB.api('/me/picture?type=normal', function (picResponse) {
	                    // console.log('Facebook Login RESPONSE: ' + picResponse.data.url);
	                    response.imageUrl = picResponse.data.url;
	                    // store data to DB - Call to API
	                    // Todo
	                    // After posting user data to server successfully store user data locally
	                    var user = {};
	                    user.type = 'Fb';
	                    user.name = response.name;
	                    user.email = response.email;
	                    user.gender = response.gender;
	                    user.image = picResponse.data;
	                    $cookieStore.put('userInfo', user);
	                    $rootScope.currentUser = user;
	                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
	                });
	            });
	        }

	        // console.log($rootScope.currentUser);
		}
	})
	.controller('AccountInfo', function ($scope, $rootScope){})
	.controller('LogoutController', function ($scope, $rootScope, $state, $ionicPopup, $ionicSideMenuDelegate, $cookieStore, $ionicHistory){
		$scope.logOut = function(){
			$ionicPopup.confirm({
				title: '<b>Log out</b>',
                template: 'Do you want to log out?',
                cancelType: 'button-assertive'
            }).then(function(res){
                if (res){
                	$ionicSideMenuDelegate.toggleLeft();
                	$ionicHistory.clearHistory();
                	if ($scope.currentUser.type == 'Gg')
                		gapi.auth.signOut();
                	if ($scope.currentUser.type == 'Fb')
                		FB.logout(function(response){});
                	$cookieStore.remove('userInfo');
                	$rootScope.currentUser = null;
                	// console.log($rootScope.currentUser);
                	$rootScope.start = false;
                    $state.go('sign-in');
                }
            });
		};
	})