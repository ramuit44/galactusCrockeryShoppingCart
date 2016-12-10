/**
  * summaryCtrl Controller
  *
  * Controller with functionality to increment the  product quantity, decrement product quantity and get total price of products added to cart.
  */

shoppingCartApp.controller('summaryCtrl', ['$scope','productService', function($scope,productService) {

	$scope.decrementProductQty = function(product) {
		product.count = productService.decrementProductQty(product.count);
  	};

      $scope.incrementProductQty = function(product) {
       	 product.count = productService.incrementProductQty(product.count);
	};

	$scope.removeProdFromCart = function(id){
		productService.removeProductFromCart($scope.selectedProducts,id);
	};

	$scope.getTotal = function(){
          return productService.getCheckoutProductsPriceTotal($scope.selectedProducts);
       };


}]);
