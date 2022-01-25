'use strict';

angular.module('myApp.contractincheiatExp', ['ngRoute', 'ui.bootstrap'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/dashboardexp/contractincheiat', {
      templateUrl: 'dashboardexp/contractincheiat/contractincheiat.html',
      controller: 'ContractIncheiatExpCtrl'
    });
  }])
  .controller('ContractIncheiatExpCtrl', ['$scope', '$location', '$http', '$uibModal', function($scope, $location, $http, $uibModal) {
    var user = JSON.parse(sessionStorage.user);

    $scope.dateexp = $http.get('http://localhost:3000/api/expeditori/' + user.userid).then(function (response) {
          $scope.dateexp = response.data[0];
        return response.data;
    });

    $scope.datetrans = $http.get('http://localhost:3000/api/expeditori/datetrans/' + sessionStorage.camionId).then(function (response) {
        $scope.datetrans = response.data;
        return response.data;
    });

    $scope.datecamion = $http.get('http://localhost:3000/api/expeditori/camion/' + sessionStorage.camionId).then(function (response) {
            $scope.datecamion = response.data[0];
            return response.data;
    });

    $scope.cerere = $http.get('http://localhost:3000/api/expeditori/cerere/' + sessionStorage.cerereId).then(function (response) {
            $scope.cerere = response.data[0];
            return response.data;
    });

    //console.log( $scope.datetrans );

  }]);