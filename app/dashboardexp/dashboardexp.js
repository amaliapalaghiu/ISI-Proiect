'use strict';

angular.module('myApp.dashboardexp', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/dashboardexp', {
      templateUrl: 'dashboardexp/dashboardexp.html',
      controller: 'DashboardExpCtrl'
    });
  }])
  .controller('DashboardExpCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.hartaExpClick = function() {
      $location.path('/dashboardexp/harta');
    }
    $scope.cereriExpClick = function() {
      $location.path('/dashboardexp/cererilemele');
    }
    $scope.cerereNouaClick = function() {
      $location.path('/dashboardexp/cereri');
    }
  }]);



  