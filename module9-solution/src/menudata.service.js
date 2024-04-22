(function () {
    
'use strict';

angular.module('data')
    .service('MenuDataService', MenuDataService)
    .constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com");


MenuDataService.$inject = ['$http', 'ApiBasePath']
function MenuDataService($http, ApiBasePath) {
    var service = this;

    // List of shopping items
    var items = [];

    service.getAllCategories = function (){
        return $http({
            method: "GET",
            url: (ApiBasePath + "/categories.json")
        }).then(function (response) {

            var categories = [];

            for (const category in response.data) {
                categories.push(response.data[category]);
            }

            return categories;
        })
        .catch(function (error) {
            console.log("Was not able to retrieve categories.");
        });;
    }

    service.getItemsForCategory = function (categoryShortName){
        console.log("passedInShortName", categoryShortName);
        return $http({
            method: "GET",
            url: (ApiBasePath + `/menu_items/${categoryShortName}.json`)
        }).then(function (response) {

            console.log("raw response", response);
            console.log("reponse data menu_items", response.data.menu_items);

            return response.data.menu_items;
        })
        .catch(function (error) {
            console.log("Was not able to retrieve categories.");
        });;
    }
}

})();