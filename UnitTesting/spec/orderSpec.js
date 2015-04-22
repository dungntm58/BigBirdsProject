describe('Order', function() {
	var $rootScope,
		$scope,
		controller;

	beforeEach(function (){
		module("MainApp.controller.order");

		inject(function ($injector){
			$rootScope = $injector.get('$rootScope');
			$scope = $rootScope.new();
			controller = $injector.get($controller)('NewOrder', {scope : $scope});
		});
	})

	describe('Initialization', function() {
		it('Should be null or empty value', function() {
			$scope.initialize();
			expect($scope.order.dishes.length).toEqual(0);
			expect($scope.order.quantity.length).toEqual(0);
			expect($scope.order.table).toEqual(null);
			expect($scope.order.datetime).toEqual(new Date());
		});
	});
})