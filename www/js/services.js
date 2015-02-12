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
        "id" : "a1",
        "name": "a1",
        "price": "2"
      },{
        "id" : "a2",
        "name": "a2",
        "price": "1.5"
      },{
        "id" : "a3",
        "name": "a3",
        "price": "2.5"
      }];

    var Main_Courses = [
      {
        "id" : "mc1",
        "name": "mc1",
        "price": "2"
      },{
        "id" : "mc2",
        "name": "mc2",
        "price": "1.5"
      },{
        "id" : "mc3",
        "name": "mc3",
        "price": "2.5"
      }];

    var Desserts = [
      {
        "id" : "d1",
        "name": "d1",
        "price": "2"
      },{
        "id" : "d2",
        "name": "d2",
        "price": "1.5"
      },{
        "id" : "d3",
        "name": "d3",
        "price": "2.5"
      }];

    var Drinks = [
      {
        "id" : "dr1",
        "name": "dr1",
        "price": "2"
      },{
        "id" : "dr2",
        "name": "dr2",
        "price": "1.5"
      },{
        "id" : "dr3",
        "name": "dr3",
        "price": "2.5"
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