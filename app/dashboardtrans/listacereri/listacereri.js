'use strict';

angular.module('myApp.listaCereriClienti', ['ngRoute', 'ui.bootstrap'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/dashboardtrans/listacereri', {
      templateUrl: 'dashboardtrans/listacereri/listacereri.html',
      controller: 'ListaCereriTransCtrl'
    });
  }])
  .controller('ListaCereriTransCtrl', ['$scope', '$location', '$http', '$uibModal', function($scope, $location, $http, $uibModal) {
    var user = JSON.parse(sessionStorage.user);
    var request = $http.get('http://localhost:3000/api/transportatori/cereriClienti').then(function (response) {
          $scope.listaCereriData = response.data;
        return response.data;
    });

    $scope.preluareMarfaTrans = function(idx){
      console.log($scope.listaCereriData[idx]);
    }

  }]);
