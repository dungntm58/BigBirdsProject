var signIn = angular.module('MainApp.services.signIn', []);

signIn
	.config(function ($httpProvider) {
		$httpProvider.interceptors.push([
			'$injector',
			function ($injector) {
				return $injector.get('AuthInterceptor');
			}
		]);
	})

	.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
		return {
			responseError: function (response) { 
				$rootScope.$broadcast({
					401: AUTH_EVENTS.notAuthenticated,
					419: AUTH_EVENTS.sessionTimeout,
					440: AUTH_EVENTS.sessionTimeout
				}[response.status], response);
				return $q.reject(response);
			}
		};
	})

	.factory('AccountService', function ($http, Session) {
	    var authService = {};
	   
	    authService.login = function (credentials) {
			return $http({
				method: 'POST',
				url : 'http://sdk108.pe.hu',
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Content-Type' : undefined
				},
				data: credentials
			})
			.then(function (res) {
				Session.create(res.data.id, res.data.user.id, res.data.user.role);
				return res.data.user;
			});
	    };
	   
	    authService.isAuthenticated = function () {
			return !!Session.userId;
	    };

	    authService.logout = function(){
	    	Session.destroy();
	    };

	    return authService;
  	})

	.service('Session', function () {
	    this.create = function (sessionId, userId, userRole) {
			this.id = sessionId;
			this.userId = userId;
	    };

	    this.destroy = function () {
			this.id = null;
			this.userId = null;
	    };
	    return this;
	});