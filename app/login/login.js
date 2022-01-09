'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$scope', '$location', function($scope, $location) {
  $scope.loginClick = function() {
    // TODO: Need to verify if credentials are ok and redirect to dashboard
    $location.path('/dashboard');
  }
  $scope.signupClick = function() {
    $location.path('/signup');
  }
}]);