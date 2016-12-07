angular.module('templates-main', ['category.tpl.html', 'category/category.tpl.html', 'index.html']);

angular.module("category.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("category.tpl.html",
    "<nav class=\"navbar\">\n" +
    "\n" +
    "  <div class=\"logo-container\">\n" +
    "    <a routerLink=\"/\"><img src=\"assets/img/logo.png\" alt=\"Storefront\"></a>\n" +
    "  </div>\n" +
    "  <div class=\"menu-container\">\n" +
    "\n" +
    "    <a class=\"nav-link hidden-phone\" (click)=\"toggleCartPopup($event)\">\n" +
    "      My Cart ({{cartLength}})\n" +
    "      <i class=\"fa fa-caret-down\" aria-hidden=\"true\"></i>\n" +
    "    </a>\n" +
    "\n" +
    "    <a class=\"mobile-menu visible-phone\">\n" +
    "      <i class=\"fa fa-bars\" aria-hidden=\"true\"></i></a>\n" +
    "\n" +
    "    <cart-popup></cart-popup>\n" +
    "  </div>\n" +
    "\n" +
    "  <ul class=\"main-menu hidden-phone\">\n" +
    "    <li>\n" +
    "      <a class=\"nav-link\" routerLink=\"/\">Home</a>\n" +
    "    </li>\n" +
    "    <li>\n" +
    "      <a class=\"nav-link\" routerLink=\"/\">Shop <i class=\"fa fa-caret-down\" aria-hidden=\"true\"></i></a>\n" +
    "    </li>\n" +
    "    <li>\n" +
    "      <a class=\"nav-link\" routerLink=\"/\">Journal</a>\n" +
    "    </li>\n" +
    "    <li>\n" +
    "      <a class=\"nav-link\" routerLink=\"/\">More <i class=\"fa fa-caret-down\" aria-hidden=\"true\"></i></a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "\n" +
    "  <div class=\"u-cf\"></div>\n" +
    "</nav>\n" +
    "\n" +
    "\n" +
    "<div class=\"router-wrapper\">\n" +
    "  <router-outlet></router-outlet>\n" +
    "</div>\n" +
    "");
}]);

angular.module("category/category.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("category/category.tpl.html",
    "<nav class=\"navbar\">\n" +
    "\n" +
    "  <div class=\"logo-container\">\n" +
    "    <a routerLink=\"/\"><img src=\"assets/img/logo.png\" alt=\"Storefront\"></a>\n" +
    "  </div>\n" +
    "  <div class=\"menu-container\">\n" +
    "\n" +
    "    <a class=\"nav-link hidden-phone\" (click)=\"toggleCartPopup($event)\">\n" +
    "      My Cart ({{cartLength}})\n" +
    "      <i class=\"fa fa-caret-down\" aria-hidden=\"true\"></i>\n" +
    "    </a>\n" +
    "\n" +
    "    <a class=\"mobile-menu visible-phone\">\n" +
    "      <i class=\"fa fa-bars\" aria-hidden=\"true\"></i></a>\n" +
    "\n" +
    "    <cart-popup></cart-popup>\n" +
    "  </div>\n" +
    "\n" +
    "  <ul class=\"main-menu hidden-phone\">\n" +
    "    <li>\n" +
    "      <a class=\"nav-link\" routerLink=\"/\">Home</a>\n" +
    "    </li>\n" +
    "    <li>\n" +
    "      <a class=\"nav-link\" routerLink=\"/\">Shop <i class=\"fa fa-caret-down\" aria-hidden=\"true\"></i></a>\n" +
    "    </li>\n" +
    "    <li>\n" +
    "      <a class=\"nav-link\" routerLink=\"/\">Journal</a>\n" +
    "    </li>\n" +
    "    <li>\n" +
    "      <a class=\"nav-link\" routerLink=\"/\">More <i class=\"fa fa-caret-down\" aria-hidden=\"true\"></i></a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "\n" +
    "  <div class=\"u-cf\"></div>\n" +
    "</nav>\n" +
    "\n" +
    "\n" +
    "<div class=\"router-wrapper\">\n" +
    "  <router-outlet></router-outlet>\n" +
    "</div>\n" +
    "");
}]);

angular.module("index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("index.html",
    "<!doctype html>\n" +
    "<html>\n" +
    "<head>\n" +
    "  <meta charset=\"utf-8\">\n" +
    "  <title>Storefront</title>\n" +
    "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
    "  <link rel=\"stylesheet\" type=\"text/css\" href=\"bower_components/bootstrap/dist/css/bootstrap.css\"/>\n" +
    "  <link rel=\"stylesheet\" type=\"text/css\" href=\"../dist/app.css\"/>\n" +
    "  <link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>\n" +
    "  <script type=\"text/javascript\" src=\"bower_components/angular/angular.js\"></script>\n" +
    "  <script type=\"text/javascript\" src=\"bower_components/angular-sanitize/angular-sanitize.js\"></script>\n" +
    "\n" +
    "\n" +
    "</head>\n" +
    "<body ng-app=\"\">\n" +
    "  <div ng-include src=\"'category/category.tpl.html'\"></div>\n" +
    "</body>\n" +
    "</html>\n" +
    "");
}]);
