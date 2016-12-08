shoppingCartApp.controller('shoppingCartProductDeatilsCtrl', ['$scope','$stateParams', function($scope,$stateParams) {

	$scope.selectedDetailedProduct = {};
	$scope.qtyValue = 1;
	$scope.init = function(){
		var selectedDetailedProductId = $stateParams.id;
		for(var i=0;i<$scope.availiableProducts.length;i++){
 					if($scope.availiableProducts[i].id == selectedDetailedProductId) {
 						$scope.selectedDetailedProduct = $scope.availiableProducts[i];

 					}
 				}
	}

	$scope.init();

	$scope.decrement = function() {
             $scope.qtyValue = $scope.qtyValue - 1;
            if ($scope.qtyValue < 1){
              $scope.qtyValue = 1;
           }
   };

      $scope.increment = function() {
       $scope.qtyValue = $scope.qtyValue + 1;
};

		

 	
 		

}]);
