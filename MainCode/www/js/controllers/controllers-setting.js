angular.module('MainApp.controllers.setting', [])

.controller('SettingController', function ($scope, $state, SettingService){
	$scope.colors = SettingService.colors;
	$scope.color = SettingService.getColor();
	$scope.language = SettingService.getLanguage();

	$scope.changeColor = function(){
		if ($scope.color == undefined || $scope.color == '') {
			$scope.color = 'Black';
		}
		SettingService.setColor($scope.color);
		// console.log("color in controller: " + $scope.color);
	};
	$scope.changeLanguage = function(){
		SettingService.setLanguage($scope.language);
		// console.log("language in controller: " + $scope.language);
	};
	$scope.gotoAbout = function(){
		$state.go('about');
	}
	$scope.gotoSuggestedApps = function(){
		$state.go('suggestedApps');
	}
	//code here
})

.controller('AboutController', function ($scope, $state){
	$scope.backToSetting = function(){
		$state.go('setting');
	}
})

.controller('SuggestedAppsController', function ($scope, $state){
	$scope.backToSetting = function(){
		$state.go('setting');
	}
})