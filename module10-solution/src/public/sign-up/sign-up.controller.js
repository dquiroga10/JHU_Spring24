(function () {
    "use strict";
    
    angular.module('public')
        .controller('SignUpController', SignUpController);
    
    SignUpController.$inject = ['validMenuItems', 'MenuService'];
    function SignUpController(validMenuItems, MenuService) {
      var signUpCtrl = this;
      signUpCtrl.completed = false;
      signUpCtrl.errorMenuItem = false;
      signUpCtrl.validMenuItems = validMenuItems;

      signUpCtrl.submit = function (menuItemNumber) {
        for(const menuItem in signUpCtrl.validMenuItems){
          if (signUpCtrl.validMenuItems[menuItem].shortName.toLowerCase() == menuItemNumber.toLowerCase()){
            MenuService.saveMenuItem(signUpCtrl.validMenuItems[menuItem]);
            signUpCtrl.completed = true;
          }
        }
      };
    }
    
})();