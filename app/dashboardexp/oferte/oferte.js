'use strict';

angular.module('myApp.oferteExp', ['ngRoute', 'ui.bootstrap'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/dashboardexp/oferte', {
      templateUrl: 'dashboardexp/oferte/oferte.html',
      controller: 'OferteExpCtrl'
    });
  }])
  .controller('OferteExpCtrl', ['$scope', '$location', '$http', '$uibModal', '$filter', function($scope, $location, $http, $uibModal, $filter) {
    var user = JSON.parse(sessionStorage.user);
    var request = $http.get('http://localhost:3000/api/expeditori/oferte').then(function (response) {
          $scope.offersData = response.data;
        return response.data; 
    });

    $scope.cereriClick = function() {
        $location.path('/dashboardexp/cererilemele');
      }

      $scope.homeClick = function() {
        $location.path('/dashboardexp');
      }

    $scope.acceptareOfertaExp = function(idx){
        console.log($scope.offersData[idx]);
      }

      

    // $scope.openModal  = function(){
    //   $uibModal.open({
    //     templateUrl : '/dashboardtrans/oferte/modalContent.html',
    //     backdrop: true
    //   });
    // };

    

  }]);