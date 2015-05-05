angular.module('MainApp.services.customer', [])
  .service('RestaurantService', function ($http, $rootScope, $cookieStore, URL_SERVER){
    this.cod = {};
    this.dinC = [];
    this.ut = {};

    return {
      reset : function(){
        this.cod = {};
        this.dinC = [];
        this.ut = {};
      },
      
      setCategoriesOfDishes : function (data){
        this.cod = data;
      },

      getCategoriesOfDishes : function (){
        return this.cod;
      },

      pushDishIntoTheList : function (value){
        // console.log(this.dinC);
        this.dinC.push(value);
      },

      setAllListOfDishes : function (data){
        this.dinC = data;
      },

      getAllListOfDishes : function () {
        return this.dinC;
      },

      setUnorderedTable : function (data){
        this.ut = data;
      },

      giveBackCorrespondingUnorderedTable : function (time){
        function filterTime(time){
          if (time.getHours() >= 0 && time.getHours() < 10)
            return 0;
          else
            if (time.getHours() >= 10 && time.getHours() < 13)
              return 1;
            else
              if (time.getHours() >= 13 && time.getHours() < 17)
                return 2;
              else
                if (time.getHours() >= 17 && time.getHours() < 19)
                  return 3;
                else return 4;
        }

        var t;
        var f = filterTime(time);
        var res;
        for (x in this.ut){
          if (time.getUTCDate() == x.date && time.getUTCMonth() == x.month && time.getUTCFullYear() == x.year)
            t = x;
            break;
        }
        if (t != null){
          for (y in t.setOfTables){
            if (f == y.instant){
              res = y.tables;
            }
          }
        }

        return res;
      },

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