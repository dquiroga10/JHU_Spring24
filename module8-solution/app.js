(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com");

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      foundMenuItems: '<',
      onRemove: '&'
    },
    controller: NarrowItDownController,
    controllerAs: 'narrowItDown',
    bindToController: true
  };

  return ddo;
}

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

  narrowItDown.removeItem = function (itemIndex) {
    narrowItDown.found.splice(itemIndex, 1);
  };

}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
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

      return foundItems;
    })
    .catch(function (error) {
      console.log("Was not able to retrieve menu items.");
    });;
  };

}

})();
