angular.module('MainApp.controllers', ['MainApp.controllers.home', 'MainApp.controllers.order', 'MainApp.controllers.menu', 'MainApp.controllers.restaurant'])
// angular.module('MainApp.controllers', [])

    .controller('CategoryController', function ($scope, CategoryService) {
        // "MenuService" is a service returning mock data (services.js)
        $scope.list = CategoryService.all();
    });
