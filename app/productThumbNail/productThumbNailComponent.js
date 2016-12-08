shoppingCartApp.directive('productThumbNail', ["$compile", function($compile){
  return {
    restrict:'E',
    scope: {
   			product: '=',
   			addToCartClick: '&'
	},
    templateUrl:'productThumbNail/productThumbNail.html',
    link: function(scope, iElem, iAttr){

    	scope.addToCart = function(id){
    		scope.addToCartClick({productid:id});
    	};
     	
     }

  };
}]);