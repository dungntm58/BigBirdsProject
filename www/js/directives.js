angular.module('MainApp.directives', []).directive('numbersOnly', function(){
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, modelCtrl) {
      modelCtrl.$parsers.push(function (inputValue) {
        if (inputValue == undefined) return '1' 
        var transformedInput = inputValue.replace(/[^0-9]/g, ''); 
        if (transformedInput!=inputValue) {
          modelCtrl.$setViewValue(transformedInput);
          modelCtrl.$render();
        }
        return transformedInput;         
      });
    }
  };
});