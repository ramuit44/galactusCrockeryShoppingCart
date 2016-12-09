shoppingCartApp.directive('checkoutPopup', ["$compile","$document","productService", function($compile,$document,productService){
  return {
    restrict:'E',
    scope: {
   			products: '=',
        popupOpen: '='
   			
	},
    templateUrl:'app_components/checkoutPopup/checkoutPopup.html',
    link: function(scope, iElem, iAttr){

       scope.getTotal = function(){
          return productService.getCheckoutProductsPriceTotal(scope.products);
       };

       scope.removeProductFromCart = function(id){
          productService.removeProductFromCart(scope.products,id);
       };

       

       $document.on('click', function (e) {
          var targetClassName = e.target.className;
                   if((targetClassName.indexOf('checkoutPopupOpener') !== -1) || (targetClassName.indexOf('removeProductCheckoutPoup') !== -1) ) return;
                   var buttonclickCondition = iElem[0].contains(e.target) && targetClassName === 'button' ;
                   if ((iElem !== e.target && !iElem[0].contains(e.target)) || buttonclickCondition) {
                        scope.$apply(function () {
                            scope.popupOpen = false;
                        });
                    }
               });
    	     	
     }

  };
}]);