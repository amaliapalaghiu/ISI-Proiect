'use strict';

angular.module('myApp.dashboard', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/dashboard', {
      templateUrl: 'dashboard/dashboard.html',
      controller: 'DashboardCtrl'
    });
  }])

  .controller('DashboardCtrl', function ($scope) {
    $scope.map = {
      center: {
        lng: 26.09,
        lat: 44.43
      },
      zoom: 13,
      mapOptions: {
        minZoom: 6,
        maxZoom: 18,
        resizeDelay: 500,
        navigationMode: 'classic',
        sliderOrientation: 'horizontal',
        sliderPosition: 'top-right',
        displayGraphicsOnPan: true,
        fadeOnZoom: false,
        logo: false,
        wrapAround180: false
      }
    };
  });