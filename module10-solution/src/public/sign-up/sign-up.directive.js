(function () {
    "use strict";
    
    angular.module('public')
        .directive('signUpDirective', SignUpDirective);
    
    SignUpDirective.$inject = ['MenuService'];
    function SignUpDirective(MenuService) {
        return {
            require: "ngModel",

            link: function(scope, element, attr, signUpCtrl) {
                function myValidation(inputtedMenuItem) {
                    var validMenuItems = scope.signUpCtrl.validMenuItems;
                    var matches = false;
                    for(const menuItem in validMenuItems){
                        if (validMenuItems[menuItem].shortName.toLowerCase() == inputtedMenuItem.toLowerCase()){
                          matches = true;
                        }
                    }
                    if (matches) {
                        signUpCtrl.$setValidity('menuItemExists', true);
                    } else {
                        signUpCtrl.$setValidity('menuItemExists', false);
                    }
                    return inputtedMenuItem;
                }
                signUpCtrl.$parsers.push(myValidation);
            }
        };
    }
    
})();