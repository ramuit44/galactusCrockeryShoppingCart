shoppingCartApp.directive('checkoutPopup', ["$compile","$document", function($compile,$document){
  return {
    restrict:'E',
    scope: {
   			products: '=',
        popupOpen: '='
   			
	},
    templateUrl:'checkoutPopup/checkoutPopup.html',
    link: function(scope, iElem, iAttr){

       scope.getTotal = function(){
          var total = 0.00;
          if(scope.products.length == 0) return total;
          for(var k=0;k<scope.products.length;k++){
            total = (total+ (scope.products[k].price * scope.products[k].count));
          }
          return total;
       }

       scope.removeProductFromCart = function(id){
          for(var k=0;k<scope.products.length;k++){
              if(scope.products[k].id == id){
                scope.products.splice(k, 1);

                 
              }
          }
       }

       

       $document.on('click', function (e) {
          var targetClassName = e.target.className;
                   if((targetClassName.indexOf('checkoutPopupOpener') !== -1) || (targetClassName.indexOf('removeProductCheckoutPoup') !== -1) ) return;
                   if (iElem !== e.target && !iElem[0].contains(e.target)) {
                        scope.$apply(function () {
                            scope.popupOpen = false;
                        });
                    }
               });
    	     	
     }

  };
}]);