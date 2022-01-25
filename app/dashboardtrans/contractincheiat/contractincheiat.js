'use strict';

angular.module('myApp.contractincheiatTrans', ['ngRoute', 'ui.bootstrap'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/dashboardtrans/contractincheiat', {
      templateUrl: 'dashboardtrans/contractincheiat/contractincheiat.html',
      controller: 'ContractIncheiatTransCtrl'
    });
  }])
  .controller('ContractIncheiatTransCtrl', ['$scope', '$location', '$http', '$uibModal', function($scope, $location, $http, $uibModal) {
    var user = JSON.parse(sessionStorage.user);
    $scope.cerere = JSON.parse(sessionStorage.cerere);

    $scope.dateexp = $http.get('http://localhost:3000/api/transportatori/dateexp/' + $scope.cerere.cerereid).then(function (response) {
          $scope.dateexp = response.data;
        return response.data;
    });

    $scope.datetrans = $http.get('http://localhost:3000/api/transportatori/datetrans/' + user.userid).then(function (response) {
        $scope.datetrans = response.data;
        return response.data;
    });

    $scope.datecamion = $http.get('http://localhost:3000/api/transportatori/datecamion', {
      params: {
          userID: user.userid,
          data_plecarii: $scope.cerere.data_plecarii,
          data_max_plecarii: $scope.cerere.data_max_plecarii,
          locul_plecarii: $scope.cerere.locul_plecarii,
          data_sosirii: $scope.cerere.data_sosirii,
          data_max_sosirii: $scope.cerere.data_max_sosirii,
          locul_sosirii: $scope.cerere.locul_sosirii
        }
      }).then(function (response) {
            $scope.datecamion = response.data;
            return response.data;
    });

  }]);
