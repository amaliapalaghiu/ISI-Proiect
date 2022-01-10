'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$scope', '$location', '$http', function($scope, $location, $http) {
  $scope.loginClick = function() {
    $http({
      method: 'GET',
      url: 'http://localhost:3000/api/users/get',
      params: {
        username: $scope.username,
        passwrd: $scope.password
      }
    }).then(function successCallback(response) {
      console.log(response);
      $location.path('/dashboard');
    }, function errorCallback(response) {
    });
  }
  $scope.signupClick = function() {
    $location.path('/signup');
  }
}]);