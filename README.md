# galactusCrockeryShoppingCart
A single page shopping cart webapplication for shopping some awesome vintage crockery.

Browsers(tested) : Chrome - Version 54.0.2840, FireFox 50.0, IE 11.0.9, Safari 6.2.8

## Libraries used
* Angular Js - MV* framework for this SPA for building the custom directives(components), controllers and services.
* Angular's UI.Router Module - Used for changing app views based on state of the application. Used for nested views.
* Bower - package manager for the solution , resolving any required library dependencies.
* Grunt - Task runner tool for building the project and running app on static server and tests on Karma.
* Ruby & Compass - In order to use Sass with Grunt and convert scss files to minified css.

## Code organization
* This project's sources are located in the app directory.
  * The required libraries are located in the app/bower_components directory.
  * The component template and its corresponding directives and controllers are located in app/app_components directory.
  * The app's main controller is located in app directory with name app.js.
  * Each of the component styles are located in the app/styles directory. The base.scss is the base style for all the component styles.
* This project's test sources are in the test directory.
  * This project's tests code coverage is in coverage directory.
  * This project's tests result report (grunt-junit-report) is in ./test-results.xml.
* This project's jshint configuration is in ./.jshintrc and jshint report is in ./jshint-report .  
* This project deleiverables are in dist directory.

## Prod Delieverables
 * dist/galactus-shopping-cart-app.min.js - All the JS, Html Templates included.
 * dist/app.min.css - All the styles.
 * dist/index.html - Index.

## Installation instructions / Building & running

### Pre requisites:
 * Install npm by installing NodeJs.
 * Install bower using  `npm install -g bower`.
 * Install grunt-cli globally using `npm install -g grunt-cli`.
 *  In order to use Sass & Compass with Grunt we need Ruby and Compass. 
     * Ruby by default  comes for linux and Mac OS X environments.
     * For windows environment Install Ruby using the [Ruby Installer](http://rubyinstaller.org/) and include the {ruby installated directory path}/bin in the path.
     * Install compass using the command `gem install compass`.

### Preparing
 * Run `bower install` to download your web app dependencies described in bower.json to `app/bower_components`.
 * Run `npm install` once to install the components described in `package.json`, required to run `grunt`. This might take a while :)
 *
 
### Building

Run `grunt` to prepare your web assets in the `dist` directory.  The default taks does the following.
 * clean - Clean the existing assets in the dist folder.
 * jshint - Run jshint validation  and create the report.
 * html2js - Covert the component html templates to js and have them added to templateCache using html2js. <b>Performance Boost</b>
 * concat:jsDist - Concatenate all the Js files (Controllers, Services and Directives) into a single Js file.
 * concat:cssDist - Concatenate all the style files into single file.
 * ngAnnotate:dist - ngAnnotate to inject dependencies - used for minified files.
 * uglify - minify the concatenated js file using uglify.
 * saas - grunt saas task for compiling scss files into css file.
 * cssmin - minify the generated css files using cssmin.
 

### Running

Note: You need to have your backend server running.

To run the app:
`grunt run`

It will:
 * build your assets.
 * run a server to serve your web app static assets on port 9005 and host 'localhost'. Note : If localhost is not supported , either use the system IP Address or DNS name or loopback address(127.0.0.1) as the hostname in the grunt config for connect.
 * the app will be run with 'dist' as the base directory using the prod deliverables.
 * have a file watching mechanism to rebuild your assets.
 * live reload support so that your browser is refreshed whenever you make changes to your sources.

### Testing

Run `grunt runtests` to run karma tests.

###URL's for testing

After the server is running you can use below URL's for testing
 * For testing the Galactus Crockery Shopping Cart app - [http://localhost:9005/](http://localhost:9005/)
 

## Components 
I have designed this app basing on componentization programming design principle. The idea is to have a input configurable resuable component which changes its behaviour basing on input parameters. This is exactly what I tried as part of the exercise. I have created and used the below 3 components for this app. I have used angular with its mv* framework to develop these components as angular directives.Each directive has its own template and its own isolated scope/model and functionality within its link function. The unit testing of these components will be extremely easy.

* <h4> Header Component</h4>
<p> Component for displaying header in the SPA . It includes the link for checkout cart popup</p>
   ```html
   <shopping-cart-header></shopping-cart-header>     
   ```

* <h4> Product Thumbnail Component</h4>
 <p> Component for displaying product details like product name, price and image as tile in the Category page. On hovering over one of the product tiles, the component displays an overlay prompting the user to Add to Cart or View Details. On-Click functionality of the hovering buttons is also embeded into this component.</p>
  ```html
   <product-thumb-nail product="product" add-to-cart-click="addProductToCart(productid)"></product-thumb-nail>
  ```
 Where product is the product Object with which the tile is populated.
 And add-to-cart-click property is used to specify the callback method which is called on click of Add to Cart button.

* <h4> Checkout Component</h4>
<p> Component for displaying the checkout popup modal. The modal/popup is displayed on click of MyCart link in the header. The component takes input the list of products added to the cart. On display of the popup, all the window region except the popup is dimmed out to give utmost focus to the popup.</p>
 ```html
  <checkout-popup  products="selectedProducts"  popup-open="true"></checkout-popup>
 ```
 Where products is the list of products added to cart.
 And popup-open is boolean parameter based on which the poup is visible or invisible.


## Solution Description
* The storefront consists of three main screens: a category list page, a product details page, and a cart page. So I created 3 different nestedviews(category,product,summary) using UI-Router configuration correspondingly. 
  ```html
    shoppingCartApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
      $urlRouterProvider.otherwise('/category');

      $stateProvider
          .state('category', {url: '/category', templateUrl: 'app_components/category/categoryHome.html'});

      $stateProvider
          .state('product', {url: '/product/:id', params: {id: null} , templateUrl: 'app_components/productDetails/productDetails.html', controller: 'shoppingCartProductDeatilsCtrl'});    

      $stateProvider
          .state('summary', {url: '/summary', templateUrl: 'app_components/shoppingCartSummary/summary.html', controller: 'summaryCtrl'}); }]);
   ```
* The app behaviour is driven using the core controller `shoppingCartAppCtrl` and its scope object. The `shoppingCartAppCtrl` is used to add products to the cart , get the Total count of products added to the cart. 
 *  The product details page behaviour is driven using `shoppingCartProductDeatilsCtrl`. This controller has methods to populate the selected Product model and to increment and decrement the quantity of the product that we want to 'Add to cart'.
 * The cart page behaviour is driven using `summaryCtrl` which has methods to increment the quantity, decrement quantity and get total price of products added to cart. 
  * Most of the common behaviours(utility) like retreiving the list of products, incrementing/decrement the product quantity, getting total price, removing from cart are captured via a common service named `productService`. The data from the json is retrived via a asynch http call, so the URL can be replaced with real time API endpoint. 

* I have used css boilerplate code to generate the base scss `base.scss` and imported the base.scss into required component's/page's scss. Each component and page has its own stylesheet thus adhering to concept of componentization.  I have used the concepts of variables, Mixins, extends (Inheritance), Nesting of the `Sass` Preprocessor to have a OOCSS -(Object Oriented CSS).



## Unit Testing
Written unit testcase for each and every service methods, directives, filters and controllers.  
<b style="font-size:28px;color:red;">The test code coverage is around 93 %</b>.
You can look thorugh code coverage report in the coverage folder. 


## Notes to Evaluator
* Tried to bring the font family, sizes as much closer as possible to the wire frames. It may not exactly match the wireframes. I could capture the font family from the image using tools and use it, but didn't had enough time. 
* Placed all the scss files in a single folder rather than putting them into their corresponding component/page directories. 
* This app had scope for animation, I just implemented the behaviour of the diming of the page on display of shopping cart popup. One animation I could think is on "Add to cart", but couldn't implement others becuase of time factor. 
* All the test specs are written in a single file `app.specs.js`. The specs in the file are modular and are per component/page. Its just I couldn't split up the file becuase of time factor. 

