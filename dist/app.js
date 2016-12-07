var shoppingCartApp = angular.module("shoppingCartApp",[ "ui.router"]);


shoppingCartApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/category');
    $stateProvider
        .state('category', {url: '/category', templateUrl: 'category/categoryHome.html'});
       
}]);


shoppingCartApp.controller('shoppingCartAppCtrl', ['$scope','productService', function($scope,productService) {

 	$scope.availiableProducts = [];

 	productService.getProducts().then(
 			function(result){
 				$scope.availiableProducts = result;
 			}
 		);

 		
 		

}]);


