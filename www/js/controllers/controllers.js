angular.module('MainApp.controllers', ['MainApp.controllers.home', 'MainApp.controllers.order', 'MainApp.controllers.menu', 'MainApp.controllers.restaurant'])
// angular.module('MainApp.controllers', [])

    .controller('CategoryController', function ($scope, $location, CategoryService) {
        // "MenuService" is a service returning mock data (services.js)
        $scope.list = CategoryService.all();

        $scope.goTo = function(page) {
            console.log('Going to ' + page);
            $scope.sideMenuController.toggleLeft();
            $location.url('/' + page);
        };
    });
