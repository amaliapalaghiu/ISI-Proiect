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
    $scope.cereriClientiTransClick = function() {
      $location.path('/dashboardtrans/listacereri');
    }
    $scope.oferteTransClick = function() {
      $location.path('/dashboardtrans/oferte');
    }
    $scope.camioaneTransClick = function() {
      $location.path('/dashboardtrans/camioane');
    }
  }]);