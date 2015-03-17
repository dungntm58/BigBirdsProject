angular.module('MainApp', ['ionic', 'MainApp.controllers', 'MainApp.directives', 'MainApp.services'])
    .provider('SettingServiceProvider', function ($injector){
        this.$get = function(){
            return angular.injector('MainApp.services').get('SettingService');
        };
    })
    .config(function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    })
    .config(function ($stateProvider, $urlRouterProvider, USER_ROLES, SettingServiceProvider) {
        //Navigate
        $stateProvider
            .state('main', {
                abstract : true,
                url: '/main',
                views : {
                    'authentication' : {
                        controller: 'CategoryController',
                        templateUrl: 'templates/Main/main.html',
                        data: {
                            'authorizedRoles': [USER_ROLES.admin, USER_ROLES.editor]
                        }
                    }
                }
            })
            .state('sign-in',{
                url: '/sign-in',
                views : {
                    'authentication' : {
                        controller: 'LoginController',
                        templateUrl: 'templates/LogIn/sign-in.html'
                    }
                }
            })
            .state('sign-up',{
                url: '/sign-up',
                views : {
                    'authentication' : {
                        controller: 'SignUpController',
                        templateUrl: 'templates/LogIn/sign-up.html'
                    }
                }
            })
            
            //State for main view after signing in successfully
            .state('home',{
                parent: 'main',
                url: '/home',
                views : {
                    'categoryContent' : {
                        controller: 'HomeController',
                        templateUrl: 'templates/Main/Home/home-'+ SettingServiceProvider.$get().getLanguage() + '.html'
                        // templateUrl: 'templates/Main/Home/home-en.html'
                    }
                }
            })
            .state('order', {
                parent: 'main',
                url: '/order',
                views : {
                    'categoryContent' : {
                        controller: 'OrderController',
                        templateUrl: 'templates/Main/Order/order.html'
                    }
                }
            })
            .state('menu', {
                parent: 'main',
                url: '/menu',
                views : {
                    'categoryContent' : {
                        controller: 'MenuController',
                        templateUrl: 'templates/Main/Menu/menu.html'
                    }
                }
            })
            .state('restaurant', {
                parent: 'main',
                url: '/restaurant',
                views : {
                    'categoryContent' : {
                        controller: 'RestaurantController',
                        templateUrl: 'templates/Main/Restaurant/restaurant.html'
                    }
                }
            })
            .state('setting',{
                parent: 'main',
                url: '/setting',
                views: {
                    'categoryContent':{
                        templateUrl: 'templates/Main/Setting/setting.html'
                    }
                }
            })
            .state('suggestedApps', {
                parent: 'main',
                url: '/suggested-apps',
                views:{
                    'categoryContent':{
                        templateUrl: 'templates/Main/Setting/suggested-apps.html'
                    }
                }
            })
            .state('about',{
                parent: 'main',
                url: '/about',
                views:{
                    'categoryContent':{
                        templateUrl: 'templates/Main/Setting/about.html'
                    }
                }
            })
        //Need some code to check wheather view signIn showing
        $urlRouterProvider.otherwise('/sign-in');
    });