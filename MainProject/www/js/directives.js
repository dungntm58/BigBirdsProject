angular.module('MainApp.directives', [])

.directive('positiveNumber', function(){
  //Use for the entering number of foods
  return {
    require: 'ngModel',
    scope: { max: '='},
    link: function(scope, elem, attrs, modelCtrl) {
      modelCtrl.$parsers.push(function (inputValue) {
        inputValue = inputValue.replace(/[^0-9]/g, '');
        if (isNaN(inputValue) || Number(inputValue) < 1) {
          inputValue = '1';
        }
        if (Number(inputValue) > scope.max) {
          inputValue = scope.max.toString();
        }
        modelCtrl.$setViewValue(inputValue);
        modelCtrl.$render();
        return inputValue;
      });
    }
  }
})

.directive('mainCategory', function(){
  return{
    restrict: 'E',
    templateUrl: 'templates/Main/main-category.html'
  }
})

.directive('mainAccount', function(){
  return{
    restrict: 'E',
    templateUrl: 'templates/Main/main-account.html'
  }
})

.directive('menuFoodSlide', function(){
  return{
    restrict: 'E',
    templateUrl: 'templates/Main/Order/menu-food-slide.html'
  }
})

.directive('tableDatetime', function(){
  return{
    restrict: 'E',
    templateUrl: 'templates/Main/Order/table-datetime.html'
  }
})

.directive('orderView', function(){
  return{
    restrict: 'E',
    templateUrl: 'templates/Main/Order/order-view.html'
  }
})

