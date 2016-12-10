/**
  * productThumbNail Controller
  *
  * Controller with functionality to display in detail product details and 
  * increment the  product quantity, decrement product quantity.
  */

shoppingCartApp.controller('shoppingCartProductDeatilsCtrl', ['$scope','$stateParams','productService', function($scope,$stateParams,productService) {

	$scope.selectedDetailedProduct = {};
	$scope.qtyValue = 1;
	$scope.init = function(){
		var selectedDetailedProductId = $stateParams.id;
		for(var i=0;i<$scope.availiableProducts.length;i++){
 					if($scope.availiableProducts[i].id == selectedDetailedProductId) {
 						$scope.selectedDetailedProduct = $scope.availiableProducts[i];

 					}
 				}
	};

	$scope.init();

	$scope.decrement = function() {
            $scope.qtyValue = productService.decrementProductQty($scope.qtyValue);
   };

      $scope.increment = function() {
        $scope.qtyValue = productService.incrementProductQty($scope.qtyValue);
	};



 	
 		

}]);
