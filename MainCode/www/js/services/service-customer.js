angular.module('MainApp.services.customer', [])
  // .factory('RestaurantService', function ($http){
  //   var Restaurant = null;
  //   var Currency = "$";
  //   var Appetizers = [
  //     {
  //       "id" : "a1",
  //       "name": "a1",
  //       "price": "2"
  //     },{
  //       "id" : "a2",
  //       "name": "a2",
  //       "price": "1.5"
  //     },{
  //       "id" : "a3",
  //       "name": "a3",
  //       "price": "2.5"
  //     },{
  //       "id" : "a4",
  //       "name": "a4",
  //       "price": "1"
  //     },{
  //       "id" : "a5",
  //       "name": "a5",
  //       "price": "3"
  //     }];

  //   var Main_Courses = [
  //     {
  //       "id" : "mc1",
  //       "name": "mc1",
  //       "price": "2"
  //     },{
  //       "id" : "mc2",
  //       "name": "mc2",
  //       "price": "1.5"
  //     },{
  //       "id" : "mc3",
  //       "name": "mc3",
  //       "price": "2.5"
  //     }];

  //   var Desserts = [
  //     {
  //       "id" : "d1",
  //       "name": "d1",
  //       "price": "2"
  //     },{
  //       "id" : "d2",
  //       "name": "d2",
  //       "price": "1.5"
  //     },{
  //       "id" : "d3",
  //       "name": "d3",
  //       "price": "2.5"
  //     }];

  //   var Drinks = [
  //     {
  //       "id" : "dr1",
  //       "name": "dr1",
  //       "price": "2"
  //     },{
  //       "id" : "dr2",
  //       "name": "dr2",
  //       "price": "1.5"
  //     },{
  //       "id" : "dr3",
  //       "name": "dr3",
  //       "price": "2.5"
  //     }];
  //   var UnorderedTable = [
  //     //define later
  //   ]

  //   // $http.get('data/menu/waitFood.json').success(function(data) {
  //   //     Appetizers = data;
  //   // });

  //   return {
  //     appetizers: function(){
  //       return Appetizers;
  //     },
  //     mainCourses: function(){
  //       return Main_Courses;
  //     },
  //     desserts: function(){
  //       return Desserts;
  //     },
  //     drinks: function(){
  //       return Drinks;
  //     },
  //     nameOfRestaurant: function(){
  //       return Restaurant;
  //     },
  //     sendOrder: function(order){
  //       //something here
  //     },
  //     unorderedTable: function(time){
  //       //compare time to other datas in database to check unordered table
  //       //get a set of unordered tables
  //     }
  //   };
  // })

  .service('RestaurantService', function ($http, $rootScope, $cookieStore, URL_SERVER){
    this.typeOfDish = {};

    function selectRestaurant(rest){
      if ($cookieStore.get('restaurant') !== rest){
        $cookieStore.remove('restaurant');
        $rootScope.restaurant = rest;
        $cookieStore.put('restaurant', rest);
      }
    }

    this.getRestaurants = function(){
      $http.get(URL_SERVER.url + '').success(function(data) {
        return data;
      })
    }

    this.getCategoriesOfDishes = function (){
      $http({
        method: 'GET',
        url: URL_SERVER.url + '',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type' : undefined
        },
        data: $rootScope.restaurant
      }).success(function (response){
        this.typeOfDish = response;
      })
    }
    
    this.getListOfDishes = function (typeOfDish) {
      $http({
        method: 'GET',
        url: URL_SERVER.url + '',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type' : undefined
        },
        data: {'restaurant' : $rootScope.restaurant, 'type' : typeOfDish}
      }).success(function (response){
        return response;
      })
    }

    this.unorderedTable = function (time){
      $http.post(URL_SERVER.url + '', time).then(function(data){
        return data;
      })
    }

    this.sendOrder = function (order){
      $http({
        method: 'POST',
        url: URL_SERVER.url + '',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type' : undefined
        },
        data: {'restaurant' : $rootScope.restaurant, 'order' : order}
      }).success(function (response){})
    }
  })