'use strict';

angular.module('myApp.contracteTrans', ['ngRoute', 'ui.bootstrap'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/dashboardtrans/contractetrans', {
      templateUrl: 'dashboardtrans/contractetrans/contractetrans.html',
      controller: 'ContracteTransCtrl'
    });
  }])
  .controller('ContracteTransCtrl', ['$scope', '$location', '$http', '$uibModal', function($scope, $location, $http, $uibModal) {
    var user = JSON.parse(sessionStorage.user);
    $scope.listaContracte = $http.get('http://localhost:3000/api/transportatori/toatecontractele/' + user.userid).then(function (response) {
          $scope.listaContracte = response.data;
          return response.data;
    });

    $scope.veziContractTrans = async function(idx) {
      sessionStorage.removeItem('cerere');
      var cerere = await $http.get('http://localhost:3000/api/transportatori/detaliiCerere/' + $scope.listaContracte[idx].cerereid).then(function (response) {
        return response.data;
      });

      sessionStorage.cerere = JSON.stringify(cerere);
      $location.path('/dashboardtrans/contractincheiat')
    };

  }]);
