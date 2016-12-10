
describe('Controller : shoppingCartAppCtrl', function () {

  var productService, $httpBackend, $scope, $compile, $filter,$controller1, $document,$stateParams;

  // load the controller's module
  beforeEach(module('shoppingCartApp'));


  

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_productService_, _$httpBackend_,_$rootScope_,_$compile_,_$controller_,_$filter_,_$document_,_$stateParams_) {
    productService = _productService_;
    $httpBackend = _$httpBackend_;
    $scope = _$rootScope_.$new();
    $compile = _$compile_;
    $controller1 = _$controller_;
    $filter=_$filter_;
    $document=_$document_;
    $stateParams=_$stateParams_;

    var valid_respond = readJSON('dataStore/products.json');
   
    $httpBackend.whenGET('dataStore/products.json').respond(
        valid_respond
        );
    var controller = $controller1('shoppingCartAppCtrl', { $scope: $scope, productService: productService});


    $httpBackend.flush();
   
  }));

  afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


  

   /**************************shoppingCartApp Contro Test Cases Start *********************************************/
   
   it('test availiable products length ', function () {

    expect($scope.availiableProducts.length).toBe(6);
    
  });


   it('test selected products length ', function () {


   	$scope.addProductToCart(2,2);
    expect($scope.selectedProducts.length).toBe(1);

    $scope.addProductToCart(2,2);
    expect($scope.selectedProducts.length).not.toBe(2);

    $scope.addProductToCart(4);
	expect($scope.selectedProducts.length).toBe(2);

	expect($scope.getTotalCountOfProductsAddedToCart()).toBe(5);
    
  });

   


   /**************************checkoutPopup Component Test Cases Start *********************************************/

   it('test checkout-popup ', function () {

   $scope.isCheckoutPopupOpen = true;
   $scope.addProductToCart(2,2);
   $scope.addProductToCart(4);

   
   var html = '<checkout-popup  products="selectedProducts" class="active" popup-open="isCheckoutPopupOpen">';
    
       var element = $compile(html)($scope);
       
       $('body').add( "div" ).addClass( "test" );
       $document.find('body').append(element);
       $scope.$digest();

        var directiveScope = element.isolateScope();
        directiveScope.removeProductFromCart(2);
        expect($scope.selectedProducts.length).toBe(1);

        $(element).click();
        expect($scope.isCheckoutPopupOpen).toBe(true);


        $('.test').click();
       	expect($scope.isCheckoutPopupOpen).toBe(false);
     });   
       

       
   /**************************Product Details Controller Test Cases Start *********************************************/

   	 it('test Product Details Controller ', function () {

   	 		$stateParams.id = 2;	 
   			var controller = $controller1('shoppingCartProductDeatilsCtrl', { $scope: $scope, $stateParams: $stateParams, productService: productService});
   			expect($scope.selectedDetailedProduct).not.toBe(null);

   			$scope.qtyValue = 6;
   			$scope.decrement();
   			expect($scope.qtyValue).toBe(5);


   			$scope.increment ();
   			expect($scope.qtyValue).toBe(6);
   	 });


   	 /**************************Header Test Cases Start *********************************************/


   	  it('test Header Component ', function () {
  		var html = '<shopping-cart-header></shopping-cart-header>';
  		var element = $compile(html)($scope);
  		$scope.$digest();
  		expect(element.html()).toContain("logo-container");

  	 });


   	/**************************Product Thumb Nail Component Test cases Start *********************************************/

   	it('test Product Thumb Nail Component', function () {

   		$scope.productToTest = {
   					"id" : 0,
				    "title": "Blue Stripe Stoneware Plate",
				    "brand": "Kiriko",
				    "price": 40,
				    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus pulvinar, placerat turpis ac, interdum metus. In eget massa sed enim hendrerit auctor a eget.",
				    "image": "blue-stripe-stoneware-plate.jpg"
  		};
  		var html = '<product-thumb-nail product="productToTest" add-to-cart-click="addProductToCart(productid)"></product-thumb-nail>';
  		var element = $compile(html)($scope);
  		$scope.$digest();
  		expect(element.html()).toContain("productBox");

  		var directiveScope = element.isolateScope();
  		directiveScope.addToCart(0);
  		expect($scope.selectedProducts.length).toBe(1);

  	 });


   	 /**************************Summary Controller Test cases Start *********************************************/
   	 	it('test Summary Controller', function () {

   	 			var controller = $controller1('summaryCtrl', { $scope: $scope, productService: productService});

   	 			$scope.productToTest = {
   					"id" : 0,
				    "title": "Blue Stripe Stoneware Plate",
				    "brand": "Kiriko",
				    "price": 40,
				    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus pulvinar, placerat turpis ac, interdum metus. In eget massa sed enim hendrerit auctor a eget.",
				    "image": "blue-stripe-stoneware-plate.jpg",
				    "count" : 5
  				};

  				$scope.incrementProductQty($scope.productToTest);
  				expect($scope.productToTest.count).toBe(6);

  				$scope.decrementProductQty($scope.productToTest);
  				expect($scope.productToTest.count).toBe(5);

  				
  				$scope.addProductToCart(1,2);
  				$scope.addProductToCart(0);

  				expect($scope.getTotal()).toBe(96);
				$scope.removeProdFromCart(0);

  				expect($scope.getTotal()).toBe(56);

  				



   	 	});

});
