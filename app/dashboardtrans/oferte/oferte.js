'use strict';

angular.module('myApp.oferteTrans', ['ngRoute', 'ui.bootstrap'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/dashboardtrans/oferte', {
      templateUrl: 'dashboardtrans/oferte/oferte.html',
      controller: 'OferteTransCtrl'
    });
  }])
  .controller('OferteTransCtrl', ['$scope', '$location', '$http', '$uibModal', '$filter', function($scope, $location, $http, $uibModal, $filter) {
    var user = JSON.parse(sessionStorage.user);
    var request = $http.get('http://localhost:3000/api/transportatori/offers/' + user.userid).then(function (response) {
          $scope.offersData = response.data;
        return response.data; 
    });

    $scope.checkfnPlecare = function() {
      $scope.offer.data_plecarii = new Date($filter('date')($scope.offer.data_plecarii, "yyyy-MM-dd"));
    }

    $scope.checkfnSosire = function() {
      $scope.offer.data_sosirii = new Date($filter('date')($scope.offer.data_sosirii, "yyyy-MM-dd"));
    }

    $scope.openModal  = function(){
      $uibModal.open({
        templateUrl : '/dashboardtrans/oferte/modalContent.html',
        backdrop: true
      });
    };

    $scope.submit = function() {
      console.log($scope.offer);
      $http({
        method: 'POST',
        url: 'http://localhost:3000/api/transportatori/offers',
        data: { 
          nr_inmatriculare: $scope.offer.nr_inmatriculare,
          data_plecarii: $scope.offer.data_plecarii,
          locul_plecarii: $scope.offer.locul_plecarii, 
          data_sosirii: $scope.offer.data_sosirii,
          locul_sosirii: $scope.offer.locul_sosirii,
          pret_km_gol: $scope.offer.pret_km_gol,
          pret_km_incarcat: $scope.offer.pret_km_incarcat
        }
      }).then(function successCallback(response) {
        window.location.reload();
        }, function errorCallback(response) {
          
        });
    };

  }]);
