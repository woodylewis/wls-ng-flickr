'use strict';

angular
.module('getphoto', [
	'ui.router',
	'getphoto.mainCtrl'
])
.config(['$stateProvider', '$locationProvider', function($stateProvider) {
  $stateProvider
    .state('main', {
      url: "/main",
      views: {
        "state" : { templateUrl: "partials/main.html" }
      }
    });
}])
.run(['$state', function($state) {
  $state.go('main');
}]);
