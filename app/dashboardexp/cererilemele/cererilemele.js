'use strict';

angular.module('myApp.cererileMele', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/dashboardexp/cererilemele', {
      templateUrl: 'dashboardexp/cererilemele/cererilemele.html',
      controller: 'CererileMeleCtrl'
    });
  }])

  .controller('CererileMeleCtrl', ['$scope', '$location', '$http', '$uibModal',function($scope, $location, $http, $uibModal) {
    var user = JSON.parse(sessionStorage.user);
    var request = $http.get('http://localhost:3000/api/expeditori/cereri/' + user.userid).then(function (response) {
          $scope.cereriData = response.data;
          console.log("Cereri info " + JSON.stringify($scope.cereriData));
        return response.data; 
    });

    

    $scope.homeClick = function() {
      $location.path('/dashboardexp');
    }

    // $scope.cereriClick = function() {
    //   $location.path('/dashboardexp/success');
    // }

    $scope.oferteClick = function() {
      $location.path('/dashboardexp/oferte');
    }

    $scope.openModalCerere  = function(){
      $uibModal.open({
        templateUrl : '/dashboardexp/cererilemele/modalCerere.html',
        backdrop: true
      });
    };

    $scope.submitCerere = function () {
      console.log($scope.cerere);
      $http({
        method: 'POST',
        url: 'http://localhost:3000/api/expeditori/cereri',
        data: {
          userid: user.userid,
          tip_marfa: $scope.cerere.tipMarfa,
          masa: $scope.cerere.masa,
          volum: $scope.cerere.volum, 
          data_plecarii: $scope.cerere.dataPlecarii,
          data_max_plecarii: $scope.cerere.dataMaxPlecare,
          locul_plecarii: $scope.cerere.loculPlecarii,
          data_sosirii: $scope.cerere.dataSosirii,
          data_max_sosirii: $scope.cerere.dataMaxSosire,
          locul_sosirii: $scope.cerere.loculSosirii,
          buget: $scope.cerere.buget,
        }
      }).then(function successCallback(response) {
        window.location.reload();
        }, function errorCallback(response) {
          
        });
    }

  }]);