'use strict';

angular.module('myApp.signup', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signup', {
    templateUrl: 'signup/signup.html',
    controller: 'SignupCtrl'
  });
}])

.controller('SignupCtrl', ['$scope', '$location', '$http', function($scope, $location, $http) {
  $scope.signupButtonClick = function() {
    if ($scope.userType === "Transportator") {
      $http({
        method: 'POST',
        url: 'http://localhost:3000/api/users/add',
        data: { 
          username: $scope.username,
          passwrd: $scope.password,
          firstName: $scope.firstName, 
          lastName: $scope.lastName,
          telephone: $scope.telephone,
          email: $scope.email,
          user_type: 1
        }
      }).then(function successCallback(response) {
          $location.path('/login');
        }, function errorCallback(response) {
          
        });
    } else if ($scope.userType === "Expeditor") {
      $http({
        method: 'POST',
        url: 'http://localhost:3000/api/users/add',
        data: { 
          username: $scope.username,
          passwrd: $scope.password,
          firstName: $scope.firstName, 
          lastName: $scope.lastName,
          telephone: $scope.telephone,
          email: $scope.email,
          user_type: 2
        }
      }).then(function successCallback(response) {
          $location.path('/login');
        }, function errorCallback(response) {
          
        });
    }
  }
}]);