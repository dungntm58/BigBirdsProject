var sideMenuApp = angular.module('MainApp', ['ionic', 'MainApp.controllers', 'MainApp.directives', 'MainApp.services']);

sideMenuApp.config(function ($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
});

sideMenuApp.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
    //Navigate
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