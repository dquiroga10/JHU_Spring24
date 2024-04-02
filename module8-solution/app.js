(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com");

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {

  var narrowItDown = this;

  narrowItDown.found = [];

  narrowItDown.getMatchedMenuItems = function (search){
    var promise = MenuSearchService.getMatchedMenuItems(search);

    promise.then( function (response){
      narrowItDown.found = response;
    });
  }

}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    console.log(searchTerm);
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (response) {

      var foundItems = [];

      if(searchTerm === '' || searchTerm === undefined){
        return foundItems;
      }

      for (const key in response.data) {
        var menu_items = response.data[key].menu_items;
        for (const item in menu_items) {
          if( menu_items[item].description.includes(searchTerm) === true ) {
            foundItems.push(menu_items[item]);
          };
        }
      }

      console.log(foundItems);

      return foundItems;
    })
    .catch(function (error) {
      console.log("Was not able to retrieve menu items.");
    });;
  };

}

})();
