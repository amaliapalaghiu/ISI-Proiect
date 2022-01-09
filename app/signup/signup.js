'use strict';

angular.module('myApp.signup', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signup', {
    templateUrl: 'signup/signup.html',
    controller: 'SignupCtrl'
  });
}])

.controller('SignupCtrl', ['$scope', '$location', function($scope, $location) {
  $scope.signupButtonClick = function() {
    // TODO: Need to verify if the username is available and the password meets all requirements
    $location.path('/login');
  }
}]);