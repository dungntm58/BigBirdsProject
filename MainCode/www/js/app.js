angular.module('MainApp', ['ionic', 'MainApp.controllers', 'MainApp.directives', 'MainApp.services', 'ngCordova', 'ngCookies','ionic.contrib.drawer'])
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
    .provider('SettingServiceProvider', function ($injector){
        this.$get = function(){
            return angular.injector('MainApp.services').get('SettingService');
        };
    })
    .config(function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    })
    .config(function ($stateProvider, $urlRouterProvider) {
        //Navigate
        $stateProvider
            .state('sign-in',{
                url: '/sign-in',
                templateUrl: 'templates/LogIn/sign-in.html',
                controller: 'LoginController'
            })
            .state('main', {
                abstract : true,
                url: '',
                templateUrl: 'templates/Main/main.html'
            })
            
            //State for main view after signing in successfully
            .state('home',{
                parent: 'main',
                url: '/home',
                controller: 'HomeController',
                // templateUrl: 'templates/Main/Home/home-'+ SettingServiceProvider.$get().getLanguage() + '.html'
                templateUrl: 'templates/Main/Home/home-en.html'
            })
            .state('order', {
                parent: 'main',
                url: '/order',
                templateUrl: 'templates/Main/Order/order.html'
            })
            .state('restaurant', {
                parent: 'main',
                url: '/restaurant',
                controller: 'RestaurantController',
                templateUrl: 'templates/Main/Restaurant/restaurant.html'
            })
            .state('setting',{
                parent: 'main',
                url: '/setting',
                templateUrl: 'templates/Main/Setting/setting.html'
            })
            .state('suggestedApps', {
                parent: 'main',
                url: '/suggested-apps',
                templateUrl: 'templates/Main/Setting/suggested-apps.html'
            })
            .state('about',{
                parent: 'main',
                url: '/about',
                templateUrl: 'templates/Main/Setting/about.html'
            })
        //Need some code to check wheather view signIn showing
        $urlRouterProvider.otherwise('/sign-in');
    });