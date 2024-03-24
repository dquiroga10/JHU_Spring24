(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)
.filter('ShoppingListTotalPrice', ShoppingListTotalPriceFilter);;

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {

  var showToBuyList = this;

  showToBuyList.items = ShoppingListCheckOffService.getToBuyItems();

  showToBuyList.buyItem = function (itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {

  var showBoughtList = this;

  showBoughtList.items = ShoppingListCheckOffService.getBoughtItems();

  showBoughtList.getTotalPrice = function (quantity, pricePerItem) {
    return quantity * pricePerItem;
  }
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var toBuyItems = [
    { name: "cookies", quantity: 5, pricePerItem: 3 },
    { name: "potatoes", quantity: 20, pricePerItem: 4 },
    { name: "hotdogs", quantity: 15, pricePerItem: 7 },
    { name: "burgers", quantity: 12, pricePerItem: 10 },
    { name: "ketchup", quantity: 4, pricePerItem: 3 }
  ];

  var boughtItems = [];

  service.buyItem = function (itemIndex) {
    var itemBought = toBuyItems[itemIndex];
    boughtItems.push(itemBought);
    toBuyItems.splice(itemIndex, 1);
  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };
}

function ShoppingListTotalPriceFilter() {
  return function (totalPrice) {
    return `$$$${totalPrice.toFixed(2)}`
  }
}

})();
