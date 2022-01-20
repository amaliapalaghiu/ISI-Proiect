'use strict';

angular.module('myApp.cererileMele', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/dashboardexp/cererilemele', {
      templateUrl: 'dashboardexp/cererilemele/cererilemele.html',
      controller: 'CererileMeleCtrl'
    });
  }])

  .controller('CererileMeleCtrl', ['$scope', '$location', '$http', '$uibModal',function($scope, $location, $http, $uibModal) {
    $scope.homeClick = function() {
      $location.path('/dashboardexp');
    }

    // $scope.cereriClick = function() {
    //   $location.path('/dashboardexp/success');
    // }

    $scope.cerereNouaClick = function() {
      $location.path('/dashboardexp/cereri');
    }

    $scope.openModalCerere  = function(){
      $uibModal.open({
        templateUrl : '/dashboardexp/cererilemele/modalCerere.html',
        backdrop: true
      });
    };

  }]);