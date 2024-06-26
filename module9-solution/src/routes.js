(function () {
    
'use strict';

angular.module('MenuApp')
    .config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/templates/home.template.html'
  })

  .state('categories', {
    url: '/categories',
    templateUrl: 'src/templates/categories.template.html',
    controller: 'CategoriesController as category',
    resolve: {
        categories: ['MenuDataService', function (MenuDataService) {
            console.log("gets here");
            return MenuDataService.getAllCategories();
        }]
    }
  })

  .state('items', {
    url: '/categories/{categoryShortName}/items',
    templateUrl: 'src/templates/items.template.html',
    controller: 'MenuItemsController as menuItems',
    resolve: {
        items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
            console.log("stateParam", $stateParams.categoryShortName);
            console.log($stateParams.categoryShortName);
            return MenuDataService.getItemsForCategory($stateParams.categoryShortName)
        }]
    }
  });
}



})();