(function () {
    "use strict";
    
    angular.module('public')
    .controller('MyInfoController', MyInfoController);
    
    MyInfoController.$inject = ['savedMenuItem'];
    function MyInfoController(savedMenuItem) {
      var $infoCtrl = this;
      $infoCtrl.savedMenuItem = savedMenuItem;
      console.log("SavedMenuItem", $infoCtrl.savedMenuItem);
    }
    
    
})();