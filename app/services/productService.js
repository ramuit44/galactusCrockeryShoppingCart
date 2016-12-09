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


      getCheckoutProductsPriceTotal : function(checkedoutProducts){
         var total = 0.00;
          if(checkedoutProducts.length == 0) return total;
          for(var k=0;k<checkedoutProducts.length;k++){
            total = (total+ (checkedoutProducts[k].price * checkedoutProducts[k].count));
          }
          return total;
      },

      removeProductFromCart : function(checkedoutProducts,id){
        for(var k=0;k<checkedoutProducts.length;k++){
              if(checkedoutProducts[k].id == id){
                checkedoutProducts.splice(k, 1);

                 
              }
          }
      },

      decrementProductQty : function(quantity) {
            quantity = quantity - 1;
            if (quantity < 1){
              quantity = 1;
           }

           return quantity;
      },

      incrementProductQty : function(quantity) {
           quantity = quantity + 1;
           return quantity;
      }


    }
    return service;

}]);