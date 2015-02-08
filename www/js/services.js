angular.module('sideMenuApp.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('MenuService', function() {

  var menuItems = [
      { text: 'Home', iconClass: 'icon ion-home', link: 'Home'},
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
