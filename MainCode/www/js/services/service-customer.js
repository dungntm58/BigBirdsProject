angular.module('MainApp.services.customer', [])
  .factory('RestaurantService', function ($http, $rootScope, $cookieStore, URL_SERVER){
    this.cod = {};
    this.dinC = [];
    this.ut = {};

    return {
      // reset : function(){
      //   this.cod = {};
      //   this.dinC = [];
      //   this.ut = {};
      // },
      
      // setCategoriesOfDishes : function (data){
      //   this.cod = data;
      // },

      // getCategoriesOfDishes : function (){
      //   return this.cod;
      // },

      // pushDishIntoTheList : function (value){
      //   // console.log(this.dinC);
      //   this.dinC.push(value);
      // },

      // setAllListOfDishes : function (data){
      //   this.dinC = data;
      // },

      // getAllListOfDishes : function () {
      //   return this.dinC;
      // },

      // setUnorderedTable : function (data){
      //   this.ut = data;
      // },

      // getUnorderedTable : function (){
      //   return this.ut;
      // },

      sendOrder : function (order){
        // $http({
        //   method: 'POST',
        //   url: URL_SERVER.url + '',
        //   headers: {
        //     'Access-Control-Allow-Origin': '*',
        //     'Content-Type' : undefined
        //   },
        //   data: {'restaurant' : $rootScope.restaurant, 'order' : order}
        // }).success(function (data, status, headers, config){})
        // .error(function(data, status, headers, config){
        //   $rootScope.$broadcast('Request Failed');
        // })
      }
    }
  })