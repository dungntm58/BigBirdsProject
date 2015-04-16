angular.module('MainApp.services', ['ionic','MainApp.services.signIn', 'MainApp.services.customer', 'MainApp.services.setting'])

	.constant('AUTH_EVENTS', {
		loginSuccess: 'auth-login-success',
		loginFailed: 'auth-login-failed',
		logoutSuccess: 'auth-logout-success',
		sessionTimeout: 'auth-session-timeout',
		notAuthenticated: 'auth-not-authenticated'
	})

	.constant('CHANGE_STATE', {
		home: 'home',
		menu: 'menu',
		order: 'order',
		restaurant: 'restaurant',
		setting: 'setting'
	})

	.constant('menuItems', [
		{ text: 'Home', iconClass: 'icon ion-home', link: 'home'},
        { text: 'Order', iconClass: 'icon ion-document-text', link: 'order'},
        { text: 'Menu', iconClass: 'icon ion-clipboard', link: 'menu'},
        { text: 'Restaurant', iconClass: 'icon ion-star', link: 'restaurant'},
        // { text: 'Analytics', iconClass: 'icon ion-stats-bars', link: 'analytics'},
        { text: 'Setting', iconClass: 'icon ion-gear-b', link: 'setting'},	
	])
