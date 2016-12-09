var shoppingCartApp = angular.module("shoppingCartApp",[ "ui.router"]);


shoppingCartApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/category');
    
    $stateProvider
        .state('category', {url: '/category', templateUrl: 'category/categoryHome.html'});

    $stateProvider
        .state('product', {url: '/product/:id', params: {id: null} , templateUrl: 'productDetails/productDetails.html', controller: 'shoppingCartProductDeatilsCtrl'});    

    $stateProvider
        .state('summary', {url: '/summary', templateUrl: 'shoppingCartSummary/summary.html', controller: 'summaryCtrl'});        
       
}]);


shoppingCartApp.controller('shoppingCartAppCtrl', ['$scope','productService', function($scope,productService) {

 	$scope.availiableProducts = [];

 	$scope.selectedProducts = [];

 	productService.getProducts().then(
 			function(result){
 				$scope.availiableProducts = result;
 				for(var i=0;i<$scope.availiableProducts.length;i++){
 					$scope.availiableProducts[i].id = i;
 				}
 			}
 		);

 	$scope.addProductToCart = function(id,qtyValue){
 		for(var i=0;i<$scope.availiableProducts.length;i++){
 			if($scope.availiableProducts[i].id === id){
 				for(var k=0;k<$scope.selectedProducts.length;k++){
 					if($scope.selectedProducts[k].id === id){
 						if(qtyValue){
 							$scope.selectedProducts[k].count = $scope.selectedProducts[k].count+qtyValue;
 						}
 						else{
 						$scope.selectedProducts[k].count = $scope.selectedProducts[k].count+1;
 						}
 						return;
 					}
 				}
 				if(qtyValue)
 				{
 					$scope.availiableProducts[i].count = qtyValue;
 				}
 				else {
 					$scope.availiableProducts[i].count = 1;
 				}
 				
 				$scope.selectedProducts.push($scope.availiableProducts[i]);  
 			}
 		}
 	};


 	$scope.getTotalCountOfProductsAddedToCart = function(){
 		var total = 0;
 		for(var i=0;i<$scope.selectedProducts.length;i++){
 			total = total+$scope.selectedProducts[i].count ;
 		}
 		return total;
 	};
 		

}]);


