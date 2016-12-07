shoppingCartApp.directive('productThumbNail', ["$compile", function($compile){
  return {
    restrict:'E',
    scope: {
   			product: '=product'
	},
    templateUrl:'productThumbNail/productThumbNail.html',
    link: function(scope, iElem, iAttr){
     }
  };
}]);