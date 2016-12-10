# galactusCrockeryShoppingCart
A single page shopping cart online webapplication for shopping awesome vintage crockery.

Browsers(tested) : Chrome - Version 54.0.2840, FireFox 50.0, IE 11.0.9, Safari 6.2.8

## Libraries used
* Angular Js - MV* framework for this SPA for building the custom directives(components), controllers and services.
* Angular's UI.Router Module - Used for changing app views based on state of the application. Used for nested views.
* Bower - package manager for the solution , resolving any required library dependencies.
* Grunt - Task runner tool for building the project and running app on static server and tests on Karma.
* Ruby & Compass - In order to use Sass with Grunt and convert scss files to minified css,  Ruby and Compass were required.

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
 * html2js - Covert the component html templates to js and have them added to templateCache using html2js.
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
 

## Components Usage
* <h4> Header Component</h4>
<p> Component for displaying header in the SPA . It includes the link for checkout cart popup</p>
   ```html
   <shopping-cart-header></shopping-cart-header>     
   ```

* <h4> Product Thumbnail Component</h4>
 <p> Component for displaying product details like product name, price and image as tile in the Category page. Hovering over one of the product tiles it displays an overlay prompting the user to Add to Cart or View Details. Functionality of the hovering buttons is also embeded into this component.</p>
  ```html
   <product-thumb-nail product="product" add-to-cart-click="addProductToCart(productid)"></product-thumb-nail>
  ```
 Where product is the product Object with which the tile is populated.
 And add-to-cart-click property is used to specify the callback method which is called on click of Add to Cart button.

* <h4> Checkout Component</h4>
<p> Component for displaying checkout popup modal on click of cart in the header in the top right corner. The component takes input the list of selected products. On display of the popup, all the window region except the popup is dimmed out to give utmost focus to the popup.</p>
 ```html
  <checkout-popup  products="selectedProducts"  popup-open="true"></checkout-popup>
 ```
 Where products is the list of products added to cart.
 And popup-open is boolean parameter based on which the poup is visible or invisible.


## Solution Description
* The idea of a widget is to have a input configurable resuable component which changes its behaviour basing on input parameters. This is exactly what I tried as part of the exercise. I have created a component element called "current-weather" which changes its behaviour(display/functionality) basing on the three different input attributes provided to that element(units, showind,title). I have used angular with its mv* framework to develop this components as angular directives.Each directive has its own template and its own isolated scope/model and functionality within its link function.

*  The "current-weather" directive is wrapped around by another directive called "weather-widget-editor-output".  The functionality of the "weather-widget-editor-output" component:
    * display the current location weather widget (functionality of current-weather) +  display the code snippet on how to include that widget in html.
    
* The Widget Editor behaviour is driven using the controller object 'weatherWidgetEditorCtrl' and its scope object. The Widget Editor uses "weather-widget-editor-output" component to list out and display the widget created using the Widget Editor form.

* Each Weather widget component using the input parameters makes call to below two asynch operations for displaying data
    * navigator.geolocation.getCurrentLocation - for fetching the current long , lat
    * HTTP GET call to OpenWeatherMap API - for getting the current location weather.
   
* The requirement is to call  "OpenWeatherMap API" once "navigator.geolocation.getCurrentLocation" is resolved. So for this approch I     took the design pattern of <b>"Promise Chaining"</b>, taking advantage that "then method of a promise returns a new derived promise".
 Consequence : 
    * We no longer have inline functions as callbacks. 
    * In fact, we don’t even categorize callbacks as “success” or “failure.” Instead, they are behaviorally specified. That way, we can chain each behavior in different combinations in order to get the deserved result per save request. 
    * Overall, the readability of the code is greatly improved. And with concise behavioral callbacks, unit testing will be a breeze.   

* Used angular Form validations for performing the userinput validations to the Wiget editor form.

* Used basic bootstrap classes for styling. Other than styling with weather icons, I didn't need the feel to add any further styling like additonal fonts , colors , animations for the widget editor and widget itself. Please let me know otherwise, infact I can do rich UX page as well.

* Written unit testcase for each and every service methods, directives, filters of the weather widget directive.  Test cases also written for the wrapper directive 'weather-widget-editor-output' and controller methods of the WeatherWidgetEditor. 
<b>The test code coverage is around 93 %</b>


## Notes

* This app used navigator.geolocation for fetchign the current location latitude and longitude. Please make sure the location settings are enabled in Mac for Safari and in IE 11(internet options) for Windows. 

* For achieving the design pattern of promise chaning , I had to use the `Function.prototype.bind`. But unfortunatley becuase of this,  the corresponding specific test cases when ran with PhantomJS headless browser are failing. This is becuase looks like phanthomJS doesn't support bind ,becuase its built with earlier version of JS engine. I am always ending up with [this](https://github.com/ariya/phantomjs/issues/10522) known phantomjs issue. So suggest to run the karma test cases using either one of the browser(Chrome,ChromeCanary,Firefox,Safari,IE) and not PhantomJS.

* Since there wasn't much styling, I haven't used any OOCSS styling principles with CSS Preprocessors like SAAS (Let me know if you require that :) - can do that as well) and css in the APP is plain simple css. 

* Ideally the directive file 'galactus-weather-widget-directive' should have been splitted into different directives.js files. filters.js file and service.js file.  Since content is minimal I'm having it in single location. Same with the specs , having all the specs in a single location 'main.js'.

* $window.navigator.geolocation.getCurrentPosition is quite an irritating service. The asynch call doesn't have any timeout its infnite. Had to struggle to get the reponse from it by adding different options to the service call . Thanks to my fellow warriors in stackoverflow.


## Feedback About the test. 
It was fun, but certainly with all the designing, coding , grunt tasks, jshints, testing with code coverage of above 90%, documenting every thing it wasn't a task of 2 hrs in my humble opinion. 

<b>It took around 6hrs to complete my test.</b>
 
