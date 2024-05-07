(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;
  var savedMenuItem = "";

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    return $http.get(ApiPath + '/menu_items/' + category + '.json').then(function (response) {
      return response.data;
    });
  };

  service.getAllMenuItems = function () {
    return $http.get(ApiPath + '/menu_items.json').then(function (response) {

      var menuGroupings = response.data;
      var menuItems = [];
      for (const category in menuGroupings) {
        var menuItemGroups = menuGroupings[category].menu_items;
        for (const menuItem in menuItemGroups){
          menuItems.push(
            { 
              shortName: menuItemGroups[menuItem].short_name,
              description: menuItemGroups[menuItem].description,
              title: menuItemGroups[menuItem].name,
              category: category,
            });
        }
      }
      return menuItems;
    });
  };

  service.getSavedMenuItem = function () {
    return savedMenuItem;
  }

  service.saveMenuItem = function (menuItem) {
    savedMenuItem = menuItem;
    return "Your information has been saved";
  }

}



})();
