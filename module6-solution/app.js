(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.items = "";
  $scope.outputMessage = "Please enter data first";
  $scope.fontColor = "text-danger";
  $scope.borderColor = "border border-danger";

  $scope.checkItems = function () {
    var itemList = $scope.items.replace(/\s/g, "").split(",");
    var ignoreItems = 0;
    var firstValidIndex = -1;
    var index = 0;
    itemList.forEach(item => {
      if(item === ''){
        ignoreItems += 1;
      }
      else if(item !== '' && firstValidIndex === -1) {
        firstValidIndex = index;
      }
      index += 1;
    });

    var totalLength = itemList.length - ignoreItems;
    if (totalLength === 0) {
      if(firstValidIndex !== -1 || itemList[firstValidIndex] !== ''){
        $scope.outputMessage = "Please enter data first";
        $scope.fontColor = "text-danger";
        $scope.borderColor = "border border-danger";
      }
    }
    else if (1 <= totalLength && totalLength <= 3) {
      $scope.outputMessage = "Enjoy!";
      $scope.fontColor = "text-success";
      $scope.borderColor = "border border-success";
    }
    else {
      $scope.outputMessage = "Too much!";
      $scope.fontColor = "text-success";
      $scope.borderColor = "border border-success";
    }
  };
}

})();
