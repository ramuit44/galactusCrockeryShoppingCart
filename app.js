
/**
  * shoppingCartApp Module
  *
  * Angular module app for the Shopping cart application.
  */
var shoppingCartApp = angular.module("shoppingCartApp",[ "templates-main","ui.router"]);



/**
  * shoppingCartApp Configuration
  *
  * UI-router configuration of states for 3 pages - category list page, a product details page, and a cart page.
  */
shoppingCartApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/category');
    
    $stateProvider
        .state('category', {url: '/category', templateUrl: 'app_components/category/categoryHome.html'});

    $stateProvider
        .state('product', {url: '/product/:id', params: {id: null} , templateUrl: 'app_components/productDetails/productDetails.html', controller: 'shoppingCartProductDeatilsCtrl'});    

    $stateProvider
        .state('summary', {url: '/summary', templateUrl: 'app_components/shoppingCartSummary/summary.html', controller: 'summaryCtrl'});        
       
}]);


/**
  * shoppingCartAppCtrl Controller
  *
  * Controller with functionality to add products to the cart , get the Total count of products added to the cart.
  */
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

 	// Method to addProduct to the cart.
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

 	// Method to get total count of products added to the cart including their quantity.
 	$scope.getTotalCountOfProductsAddedToCart = function(){
 		var total = 0;
 		for(var i=0;i<$scope.selectedProducts.length;i++){
 			total = total+$scope.selectedProducts[i].count ;
 		}
 		return total;
 	};

 	 		

}]);


