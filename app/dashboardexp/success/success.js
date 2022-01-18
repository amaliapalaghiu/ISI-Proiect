'use strict';

angular.module('myApp.success', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/dashboardexp/success', {
      templateUrl: 'dashboardexp/success/success.html',
      controller: 'SuccessCtrl'
    });
  }])

  .controller('SuccessCtrl', ['$scope', '$location', '$http', function($scope, $location, $http) {
    $scope.newButtonClick = function() {
      $location.path('/dashboardexp/cereri');
    }

    $scope.homeClick = function() {
      $location.path('/dashboardexp');
    }

    $scope.cereriButtonClick = function() {
      $location.path('/dashboardexp/cererilemele');
    }
  }]);