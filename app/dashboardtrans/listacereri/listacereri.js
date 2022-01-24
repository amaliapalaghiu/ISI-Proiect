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

    $scope.preluareMarfaTrans = async function(idx) {
      sessionStorage.removeItem('cerere');
      sessionStorage.cerere = JSON.stringify($scope.listaCereriData[idx]);
    
      var dateexp = await $http.get('http://localhost:3000/api/transportatori/dateexp/' + $scope.listaCereriData[idx].cerereid).then(function (response) {
        return response.data;
      });

      var datetrans = await $http.get('http://localhost:3000/api/transportatori/datetrans/' + user.userid).then(function (response) {
          return response.data;
      });

      $http({
        method: 'POST',
        url: 'http://localhost:3000/api/transportatori/contracte',
        data: { 
          transportatorid: datetrans.transportatorid,
          expeditorid: dateexp.expeditorid,
          cerereid: $scope.listaCereriData[idx].cerereid
        }
      }).then(function (response) {
            $location.path('/dashboardtrans/contractincheiat')
      });
    }

  }]);
