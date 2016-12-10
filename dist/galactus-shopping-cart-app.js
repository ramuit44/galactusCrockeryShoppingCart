
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

/**
  * productThumbNail Directive
  *
  * Component for displaying product details like product name, price and image as tile in the Category page. 
  * On hovering over one of the product tiles, the component displays an overlay prompting the user to Add to Cart or View Details. 
  * On-Click functionality of the hovering buttons is also embedded into this component.
  */

shoppingCartApp.directive('productThumbNail', ["$compile", function($compile){
  return {
    restrict:'E',
    scope: {
   			product: '=',
   			addToCartClick: '&'
	},
    templateUrl:'app_components/productThumbNail/productThumbNail.html',
    link: function(scope, iElem, iAttr){

    	scope.addToCart = function(id){
    		scope.addToCartClick({productid:id});
    	};
     	
     }

  };
}]);
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

/**
  * productService Service
  *
  * Service for retrieving the list of products,
  * incrementing/decrement the product quantity, 
  * getting total price, removing from cart. 
  */

shoppingCartApp.service('productService', ["$http", "$filter", "$window", "$q", "$timeout", function($http, $filter, $window, $q, $timeout) {
  "use strict";
    var service = {
      
      products: [],

      productsUrl : 'dataStore/products.json',
     
      getProducts: function() {

        if(this.products.length > 0) return this.products

        var defer = $q.defer();

        //The data from the json is retrieved via a asynch http call, so the URL can be replaced with real time API endpoint.
        $http.get(this.productsUrl).then(function(response) {
            defer.resolve(response.data);
        }, function(response) {
            defer.reject(response);
        });

        return defer.promise;
      },


      getCheckoutProductsPriceTotal : function(checkedoutProducts){
         var total = 0.00;
          if(checkedoutProducts.length == 0) return total;
          for(var k=0;k<checkedoutProducts.length;k++){
            total = (total+ (checkedoutProducts[k].price * checkedoutProducts[k].count));
          }
          return total;
      },

      removeProductFromCart : function(checkedoutProducts,id){
        for(var k=0;k<checkedoutProducts.length;k++){
              if(checkedoutProducts[k].id == id){
                checkedoutProducts.splice(k, 1);

                 
              }
          }
      },

      decrementProductQty : function(quantity) {
            quantity = quantity - 1;
            if (quantity < 1){
              quantity = 1;
           }

           return quantity;
      },

      incrementProductQty : function(quantity) {
           quantity = quantity + 1;
           return quantity;
      }


    }
    return service;

}]);
angular.module('templates-main', ['app_components/category/categoryHome.html', 'app_components/checkoutPopup/checkoutPopup.html', 'app_components/header/header.html', 'app_components/productDetails/productDetails.html', 'app_components/productThumbNail/productThumbNail.html', 'app_components/shoppingCartSummary/summary.html']);

angular.module("app_components/category/categoryHome.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app_components/category/categoryHome.html",
    "<div  class=\"header-container\">\n" +
    "\n" +
    "  <div class=\"textblock\">\n" +
    "    <div class=\"wrapper\">\n" +
    "      <h1><span>Plates</span></h1>\n" +
    "      <p>\n" +
    "        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus pulvinar, placerat turpis ac, interdum metus. In eget massa sed enim hendrerit auctor a eget.\n" +
    "      </p>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div  class=\"product-list-container container\">\n" +
    "  <div class=\"row\">\n" +
    "\n" +
    "\n" +
    "    \n" +
    "              <product-thumb-nail product=\"product\" class=\"one-third column\" ng-repeat=\"product in availiableProducts\"  add-to-cart-click=\"addProductToCart(productid)\"></product-thumb-nail>\n" +
    "\n" +
    "  \n" +
    "\n" +
    "\n" +
    "\n" +
    "  </div>\n" +
    "  <br/>\n" +
    "</div>");
}]);

angular.module("app_components/checkoutPopup/checkoutPopup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app_components/checkoutPopup/checkoutPopup.html",
    "<div ng-repeat=\"product in products\" class=\"cart-item\">\n" +
    "\n" +
    "  <img src=\"images/{{product.image}}\">\n" +
    "  <a class=\"remove-icon noselect removeProductCheckoutPoup\" title=\"Remove\"\n" +
    "          ng-click=\"removeProductFromCart(product.id)\">X</a>\n" +
    "  <p class=\"strong\">\n" +
    "    {{product.title}}</p>\n" +
    "  <p class=\"checkoutProductCount\">\n" +
    "    x {{product.count}}</p>\n" +
    "  <p class=\"checkoutProductBrand\">\n" +
    "    {{product.brand}}</p>\n" +
    "  <p class=\"checkoutProductPrice\">\n" +
    "    {{product.price | currency:USD}}</p>\n" +
    "\n" +
    "  \n" +
    "</div>\n" +
    "<div ng-if=\"products.length == 0\" class=\"cart-item\">\n" +
    "  <br>\n" +
    "  <p>The cart is empty.</p>\n" +
    "  <br>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"actionsProductCheckoutPoup\">\n" +
    "  <div>\n" +
    "    <p class=\"pull-right\">{{getTotal() | currency:USD}}</p>\n" +
    "    <p>Total</p>\n" +
    "   \n" +
    "  </div>\n" +
    "  <a class=\"button\" ui-sref=\"summary\">View Cart</a>\n" +
    "  <button class=\"button-primary u-pull-right\"\n" +
    "    [disabled]=\"products.length === 0\"\n" +
    "    (click)=\"checkout()\">Checkout</button>\n" +
    "  \n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "");
}]);

angular.module("app_components/header/header.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app_components/header/header.html",
    "<nav class=\"navbar\">\n" +
    "\n" +
    "  <div class=\"logo-container\">\n" +
    "    <a href=\"/\"><img src=\"images/logo.png\" alt=\"Galctus Shopping Cart\"></a>\n" +
    "  </div>\n" +
    "  <div class=\"menu-container\">\n" +
    "\n" +
    "    <!--<a class=\"nav-link hidden-phone\" toggle-class=\"active\">\n" +
    "      MY CART ({{getTotalCountOfProductsAddedToCart()}})\n" +
    "      <i class=\"fa fa-caret-down\" aria-hidden=\"true\"></i>\n" +
    "    </a>-->\n" +
    "\n" +
    "    <a class=\"nav-link hidden-phone checkoutPopupOpener\" ng-click=\"isCheckoutPopupOpen = !isCheckoutPopupOpen\">\n" +
    "      MY CART ({{getTotalCountOfProductsAddedToCart()}})\n" +
    "      <i class=\"fa fa-caret-down\" aria-hidden=\"true\"></i>\n" +
    "    </a>\n" +
    "\n" +
    "    <checkout-popup  products=\"selectedProducts\" ng-class=\"{ 'active': isCheckoutPopupOpen }\" popup-open=\"isCheckoutPopupOpen\">\n" +
    "\n" +
    "   </checkout-popup>\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <!--<a class=\"mobile-menu visible-phone\">\n" +
    "      <i class=\"fa fa-bars\" aria-hidden=\"true\"></i></a>-->\n" +
    "\n" +
    "    \n" +
    "  </div>\n" +
    "\n" +
    "  <ul class=\"main-menu hidden-phone\">\n" +
    "    <li>\n" +
    "      <a class=\"nav-link\" href=\"/\">HOME</a>\n" +
    "    </li>\n" +
    "    <li>\n" +
    "      <a class=\"nav-link\" href=\"/\">SHOP <i class=\"fa fa-caret-down\" aria-hidden=\"true\"></i></a>\n" +
    "    </li>\n" +
    "    <li>\n" +
    "      <a class=\"nav-link\" href=\"/\">JOURNAL</a>\n" +
    "    </li>\n" +
    "    <li>\n" +
    "      <a class=\"nav-link\" href=\"/\">MORE <i class=\"fa fa-caret-down\" aria-hidden=\"true\"></i></a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "\n" +
    " \n" +
    "</nav>\n" +
    "\n" +
    "\n" +
    "");
}]);

angular.module("app_components/productDetails/productDetails.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app_components/productDetails/productDetails.html",
    "<div class=\"container\">\n" +
    "\n" +
    "  <div class=\"row\">\n" +
    "      <div class=\"breadcrumbs\">\n" +
    "        <a class=\"nav-link\" href=\"/\">HOME</a>\n" +
    "        <span class=\"nav-link\"> / </span>\n" +
    "        <a class=\"nav-link\" href=\"#\">PLATES</a>\n" +
    "        <span class=\"nav-link\"> / </span>\n" +
    "        <span class=\"nav-link currentNode\">{{selectedDetailedProduct.title | uppercase}}</span>\n" +
    "      </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"row\">\n" +
    "\n" +
    "    <!-- Image container -->\n" +
    "    <div class=\"seven columns\">\n" +
    "      <img class=\"u-max-full-width\" src=\"images/{{selectedDetailedProduct.image}}\" alt=\"{{selectedDetailedProduct.title}}\">\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Product details -->\n" +
    "    <div class=\"five columns product-details\">\n" +
    "      <p class=\"brand\"> {{selectedDetailedProduct.brand}} </p>\n" +
    "      <p class=\"title\"> {{selectedDetailedProduct.title}} </p>\n" +
    "      <p class=\"brand\"> {{selectedDetailedProduct.price | currency}} </p>\n" +
    "      <p class=\"brand\"> {{selectedDetailedProduct.description}} </p>\n" +
    "      <hr>\n" +
    "      <div class=\"actions\">\n" +
    "        <div class=\"incrdcr\">\n" +
    "        <div class=\"number noselect\"> {{qtyValue}} </div>\n" +
    "          <div  class=\"actions\">\n" +
    "            <div class=\"noselect\" ng-click=\"increment()\" ng-init=\"qtyValue=1\">+</div>\n" +
    "            <div class=\"noselect\" ng-click=\"decrement()\" >-</div>\n" +
    "        </div>\n" +
    "       </div> \n" +
    "        <button class=\"button-primary\" ng-click=\"addProductToCart(selectedDetailedProduct.id,qtyValue)\">Add To Cart</button>\n" +
    "      </div>\n" +
    "      \n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("app_components/productThumbNail/productThumbNail.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app_components/productThumbNail/productThumbNail.html",
    "<div class=\"image-container\">\n" +
    "  <img class=\"productBox\" src=\"images/{{product.image}}\" alt=\"{{product.title}}\">\n" +
    "  <div class=\"overlay\">\n" +
    "    <div><a class=\"button button-primary\" ui-sref=\"product({ id: product.id })\">View Details</a></div>\n" +
    "    <div><button class=\"button-primary\" ng-click=\"addToCart(product.id)\">Add To Cart</button></div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<br/>\n" +
    "<p class=\"brand\" title=\"{{product.brand}}\">{{product.brand}}</p>\n" +
    "<p class=\"title\" title=\"{{product.title}}\">{{product.title}}</p>\n" +
    "<p class=\"brand\">{{product.price | currency}}</p>\n" +
    "<br/>\n" +
    "");
}]);

angular.module("app_components/shoppingCartSummary/summary.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app_components/shoppingCartSummary/summary.html",
    "<div class=\"summaryPage\">\n" +
    "    <div class=\"container\">\n" +
    "      <div class=\"row subtitle\">\n" +
    "        <h1>Shopping Cart</h1>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"container content-table\">\n" +
    "      <div class=\"row\">\n" +
    "        <table >\n" +
    "          <thead ng-if=\"selectedProducts.length > 0\">\n" +
    "            <tr>\n" +
    "              <th>Product</th>\n" +
    "              <th>Quantity</th>\n" +
    "              <th>Total</th>\n" +
    "              <th>Action</th>\n" +
    "            </tr>\n" +
    "          </thead>\n" +
    "          <tbody>\n" +
    "\n" +
    "            <!-- Products -->\n" +
    "            <tr ng-repeat=\"product in selectedProducts\" class=\"productRow\">\n" +
    "\n" +
    "              <!-- Product details -->\n" +
    "              <td class=\"product-details\">\n" +
    "                <img src=\"images/{{product.image}}\">\n" +
    "                <p class=\"brand\" title=\"{{product.brand}}\">\n" +
    "                  {{product.brand}}</p>\n" +
    "                <p class=\"title\" title=\"{{product.title}}\">\n" +
    "                  {{product.title}}</p>\n" +
    "              </td>\n" +
    "\n" +
    "              <!-- Quantity -->\n" +
    "              <td>\n" +
    "                 \n" +
    "                      <div class=\"incrdcr\">\n" +
    "                        <div class=\"number noselect\"> {{product.count}} </div>\n" +
    "                          <div  class=\"actions\">\n" +
    "                            <div class=\"noselect\" ng-click=\"incrementProductQty(product)\">+</div>\n" +
    "                            <div class=\"noselect\" ng-click=\"decrementProductQty(product)\" >-</div>\n" +
    "                        </div>\n" +
    "                     </div> \n" +
    "                 \n" +
    "\n" +
    "              </td>\n" +
    "\n" +
    "              <!-- Price -->\n" +
    "              <td class=\"price\">{{product.price*product.count | currency:USD}}</td>\n" +
    "\n" +
    "              <!-- Actions -->\n" +
    "              <td>\n" +
    "                <a class=\"prod-remove-icon noselect removeProductCheckoutPoup\" title=\"Remove\"\n" +
    "                    ng-click=\"removeProdFromCart(product.id)\">X</a>\n" +
    "              </td>\n" +
    "\n" +
    "            </tr>\n" +
    "\n" +
    "            <tr ng-if = \"selectedProducts.length === 0\">\n" +
    "              <td colspan=\"4\" class=\"cart-empty-text\">\n" +
    "                <h5>Empty Cart</h5>\n" +
    "              </td>\n" +
    "            </tr>\n" +
    "\n" +
    "\n" +
    "            <!-- Summary -->\n" +
    "            <tr class=\"summary\">\n" +
    "              <td colspan=\"2\">\n" +
    "                <p class=\"overviewContent\">CART OVERVIEW</p>\n" +
    "                <p class=\"overviewContent\">SUBTOTAL</p>\n" +
    "                <p class=\"overviewContent\">TOTAL</p>\n" +
    "              </td>\n" +
    "              <td colspan=\"2\">\n" +
    "                <p class=\"overviewMetrics\">&nbsp;</p>\n" +
    "                <p class=\"overviewMetrics\">{{getTotal() | currency:USD}}</p>\n" +
    "                <p class=\"total\">{{getTotal() | currency:USD}} CAD</p>\n" +
    "              </td>\n" +
    "            </tr>\n" +
    "\n" +
    "\n" +
    "            <!-- Footer Buttons -->\n" +
    "            <tr class=\"footer-actions\">\n" +
    "              <td colspan=\"2\">\n" +
    "                <a class=\"nav-link\" ui-sref=\"category\">Continue Shopping</a>\n" +
    "              </td>\n" +
    "              <td colspan=\"2\">\n" +
    "                <button class=\"button-primary\">Checkout ({{getTotal() | currency:USD}})</button>\n" +
    "              </td>\n" +
    "            </tr>\n" +
    "\n" +
    "          </tbody>\n" +
    "        </table>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "</div>");
}]);
