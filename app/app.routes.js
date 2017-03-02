var myapp = angular.module('MoviePosterApp');

myapp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'components/main/main.html',
      controller: 'MainController',
    });

  $locationProvider.html5Mode(true);
}]);