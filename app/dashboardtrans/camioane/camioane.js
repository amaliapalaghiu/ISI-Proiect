'use strict';

angular.module('myApp.camioaneTrans', ['ngRoute', 'ui.bootstrap'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/dashboardtrans/camioane', {
      templateUrl: 'dashboardtrans/camioane/camioane.html',
      controller: 'CamioaneTransCtrl'
    });
  }])
  .controller('CamioaneTransCtrl', ['$scope', '$location', '$http', '$uibModal', function($scope, $location, $http, $uibModal) {
    var user = JSON.parse(sessionStorage.user);
    var request = $http.get('http://localhost:3000/api/transportatori/camioane/' + user.userid).then(function (response) {
          $scope.trucksData = response.data;
        return response.data; 
    });

    $scope.openModalTrucks  = function(){
      $uibModal.open({
        templateUrl : '/dashboardtrans/camioane/modalContentCamioane.html',
        backdrop: true
      });
    };

    $scope.submitTrucks = function() {
      console.log($scope.truck);
      $http({
        method: 'POST',
        url: 'http://localhost:3000/api/transportatori/camioane',
        data: {
          userid: user.userid,
          tip_camion: $scope.truck.nr_inmatriculare,
          volum: $scope.truck.volum,
          latime: $scope.truck.latime, 
          lungime: $scope.truck.lungime,
          inaltime: $scope.truck.inaltime,
          greutate: $scope.truck.greutate,
        }
      }).then(function successCallback(response) {
        window.location.reload();
        }, function errorCallback(response) {
          
        });
    };

  }]);