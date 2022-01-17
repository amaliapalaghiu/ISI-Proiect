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

  // .controller('DashboardExpCtrl', function ($scope) {
  //   $scope.map = {
  //     center: {
  //       lng: 26.09,
  //       lat: 44.43
  //     },
  //     zoom: 13,
  //     mapOptions: {
  //       minZoom: 6,
  //       maxZoom: 18,
  //       resizeDelay: 500,
  //       navigationMode: 'classic',
  //       sliderOrientation: 'horizontal',
  //       sliderPosition: 'top-right',
  //       displayGraphicsOnPan: true,
  //       fadeOnZoom: false,
  //       logo: false,
  //       wrapAround180: false
  //     }
  //   };
  // });

  