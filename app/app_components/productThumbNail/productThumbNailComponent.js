/**
  * productThumbNail Directive
  *
  * Component for displaying product details like product name, price and image as tile in the Category page. 
  * On hovering over one of the product tiles, the component displays an overlay prompting the user to Add to Cart or View Details. 
  * On-Click functionality of the hovering buttons is also embedded into this component.
  */

shoppingCartApp.directive('productThumbNail', ["$compile", function($compile){
  return {
    restrict:'E',
    scope: {
   			product: '=',
   			addToCartClick: '&'
	},
    templateUrl:'app_components/productThumbNail/productThumbNail.html',
    link: function(scope, iElem, iAttr){

    	scope.addToCart = function(id){
    		scope.addToCartClick({productid:id});
    	};
     	
     }

  };
}]);