var allServices = angular.module('MainApp.services', [])

/**
 * A simple example service that returns some data.
 */
  allServices.factory('CategoryService', function() {

    var menuItems = [
        { text: 'Home', iconClass: 'icon ion-home', link: 'home'},
        { text: 'Order', iconClass: 'icon ion-document-text', link: 'order'},
        { text: 'Menu', iconClass: 'icon ion-clipboard', link: 'menu'},
        { text: 'Restaurant', iconClass: 'icon ion-star', link: 'restaurant'}
    ];

    return {
      all: function() {
        return menuItems;
      },

      get: function(index){
        return menuItems[index];
      },
    };
  });

  allServices.factory('MenuFoodService', function($http){
    var Appetizers = [
      {
        "name": "a1",
        "price": "$2"
      },{
        "name": "a2",
        "price": "$1.5"
      },{
        "name": "a3",
        "price": "$2.5"
      }];

    var Main_Courses = [
      {
        "name": "mc1",
        "price": "$2"
      },{
        "name": "mc2",
        "price": "$1.5"
      },{
        "name": "mc3",
        "price": "$2.5"
      }];

    var Desserts = [
      {
        "name": "d1",
        "price": "$2"
      },{
        "name": "d2",
        "price": "$1.5"
      },{
        "name": "d3",
        "price": "$2.5"
      }];

    var Drinks = [
      {
        "name": "dr1",
        "price": "$2"
      },{
        "name": "dr2",
        "price": "$1.5"
      },{
        "name": "dr3",
        "price": "$2.5"
      }];

    // $http.get('data/menu/waitFood.json').success(function(data) {
    //     Appetizers = data;
    // });

    return {
      appetizers: function(){
        return Appetizers;
      },
      mainCourses: function(){
        return Main_Courses;
      },
      desserts: function(){
        return Desserts;
      },
      drinks: function(){
        return Drinks;
      }
    };
  });