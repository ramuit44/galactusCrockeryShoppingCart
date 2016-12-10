/**
  * shoppingCartHeader Directive
  *
  * Component to display the header all across the SPA.
  */
shoppingCartApp.directive('shoppingCartHeader', ["$compile", function($compile){
  return {
    restrict:'E',
    templateUrl:'app_components/header/header.html',
    link: function(scope, iElem, iAttr){
     }
  };
}]);