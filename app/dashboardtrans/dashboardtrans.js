'use strict';

angular.module('myApp.dashboardtrans', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/dashboardtrans', {
      templateUrl: 'dashboardtrans/dashboardtrans.html',
      controller: 'DashboardTransCtrl'
    });
  }])

  .controller('DashboardTransCtrl', function ($scope) {
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