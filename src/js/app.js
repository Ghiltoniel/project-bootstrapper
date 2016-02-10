'use strict';

// Declare app level module which depends on filters, and services
angular.module('app', ['ngRoute']).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.
      when('/main', {
        templateUrl: 'partials/main.html',
        controller: 'ExempleController'
      }).
      otherwise({
        redirectTo: '/main'
      });
}]);