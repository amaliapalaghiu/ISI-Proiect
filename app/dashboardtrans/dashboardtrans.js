'use strict';

angular.module('myApp.dashboardtrans', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/dashboardtrans', {
      templateUrl: 'dashboardtrans/dashboardtrans.html',
      controller: 'DashboardTransCtrl'
    });
  }])
  .controller('DashboardTransCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.hartaTransClick = function() {
      $location.path('/dashboardtrans/harta');
    }
    $scope.oferteTransClick = function() {
      $location.path('/dashboardtrans/oferte');
    }
  }]);