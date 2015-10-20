'use strict';

angular.module('getphoto', [
	'ui.router',
	'getphoto.mainCtrl'
])
.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {

  $stateProvider
    .state('main', {
      url: "/main",
      views: {
        "state" : { templateUrl: "partials/main.html" }
      }
    });
}]);
