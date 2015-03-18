angular.module('MainApp.services.setting', [])

.service('SettingService', function(){
	var color = "Black";
	var language = "en";
	this.colors = ['Gray', 'Blue', 'Pink', 'Violet', 'Yellow', 'Green', 'Brown'];
	this.setColor = function(c){
		color = c;
		// console.log("color is set " + color + ", real color is " + c);
	}
	this.setLanguage = function(lang){
		language = lang;
		// console.log("language is set " + language + ", real language is " + lang);
	}
	this.getColor = function(){
		// console.log("color is " + color + " now.");
		return color;
	}
	this.getLanguage = function(){
		// console.log("language is " + language + " now");
		return language;
	}
})