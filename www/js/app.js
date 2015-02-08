var sideMenuApp = angular.module('MainApp', ['ionic', 'MainApp.controllers', 'sideMenuApp.services']);

sideMenuApp.config(function ($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
});

sideMenuApp.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
        .state('home',{
            url: '/home',
            controller: 'HomeController',
            templateUrl: 'templates/home.html'
        })
        .state('order', {
            url: '/order',
            controller: 'OrderController',
            templateUrl: 'templates/order.html'
        })
        .state('menu', {
            url: '/menu',
            controller: 'MenuController',
            templateUrl: 'templates/menu.html'
        })
        .state('restaurant', {
            url: '/restaurant',
            controller: 'RestaurantController',
            templateUrl: 'templates/restaurant.html'
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home');
    }
]);