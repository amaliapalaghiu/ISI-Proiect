'use strict';

angular.module('myApp.cereriExp', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/dashboardexp/cereri', {
      templateUrl: 'dashboardexp/cereri/cereri.html',
      controller: 'CereriExpCtrl'
    });
  }])

  .controller('CereriExpCtrl', ['$scope', '$location', '$http', function($scope, $location, $http) {
    $scope.homeClick = function() {
      $location.path('/dashboardexp');
    }

    $scope.cereriClick = function() {
      $location.path('/dashboardexp/cererilemele');
    }

    $scope.sendButtonClick = function() {
      $location.path('/dashboardexp/success');
    }
  }]);