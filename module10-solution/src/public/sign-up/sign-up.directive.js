(function () {
    "use strict";
    
    angular.module('public')
        .directive('SignUpDirective', SignUpDirective);
    
    SignUpDirective.$inject = ['validMenuItems', 'MenuService'];
    function SignUpDirective(validMenuItems, MenuService) {
        return {
            require: "ngModel",
            //name your scope key and value.
            scope: {
                validateMenuItem: "=validateMenuItem"
            },
            link: function(scope, modelVal) {
        
                modelVal.$validators.validateMenuItem = function(val) {
                    //Write your logic or condition in this function
                   //return false if invalid and return true if valid.
                    /*
                    if(condition)
                    {
                        //if true
                        reutrn true;
                    }
                    else{
                        //if false
                        return false
                    }
                    */
                };
        
                scope.$watch("validateMenuItem", function() {
                    modelVal.$validate();
                });
        
            }
        
        };
    }
    
})();