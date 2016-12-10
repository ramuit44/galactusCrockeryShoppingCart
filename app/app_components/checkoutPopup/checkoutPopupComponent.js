/**
  * checkoutPopup Directive
  *
  * Component for displaying the checkout popup modal. 
  * The modal/popup is displayed on click of MyCart link in the header. 
  * The component takes input the list of products added to the cart. 
  * On display of the popup, all the window region except the popup is dimmed out to give utmost focus to the popup.
  */

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

       
       //Handle all the click eventss
       $document.on('click', function (e) {
          var targetClassName = e.target.className;
                   //if click is on the Mycart link itself
                   if((targetClassName.indexOf('checkoutPopupOpener') !== -1) || (targetClassName.indexOf('removeProductCheckoutPoup') !== -1) ) return;
                   
                   //Condition to check for the click of view cart button ; In this case the popup should be hiddern
                   // TODO -- Logic ould be refined better to be more generic. 
                   var buttonclickCondition = iElem[0].contains(e.target) && targetClassName === 'button' ;

                   //Check if clicking the element within the same div only, in that case dont hide the popup
                   if ((iElem !== e.target && !iElem[0].contains(e.target)) || buttonclickCondition) {
                        scope.$apply(function () {
                            //hide the popup
                            scope.popupOpen = false;
                        });
                    }
               });
    	     	
     }

  };
}]);