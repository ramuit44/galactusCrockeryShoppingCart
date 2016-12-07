shoppingCartApp.service('productService', ["$http", "$filter", "$window", "$q", "$timeout", function($http, $filter, $window, $q, $timeout) {
  "use strict";
    var service = {
      
      products: [],
     
      getProducts: function() {

        if(this.products.length > 0) return this.products

        var defer = $q.defer();

        $http.get('dataStore/products.json').then(function(response) {
            defer.resolve(response.data);
        }, function(response) {
            defer.reject(response);
        });

        return defer.promise;
      },


      populateModalObjectFromResponse : function(){},


      getCurrentPosition: function() {}
    }
    return service;

}]);