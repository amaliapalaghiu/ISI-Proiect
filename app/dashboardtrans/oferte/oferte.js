'use strict';

angular.module('myApp.oferteTrans', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/dashboardtrans/oferte', {
      templateUrl: 'dashboardtrans/oferte/oferte.html',
      controller: 'OferteTransCtrl'
    });
  }])
  .controller('OferteTransCtrl', ['$scope', '$location', '$http', function($scope, $location, $http) {
    var user = JSON.parse(sessionStorage.user);
    var request = $http.get('http://localhost:3000/api/transportatori/offers/' + user.userid).then(function (response) {
        if (response.data.length == 0) {
          $scope.offersData = "No offer";
        } else {
          $scope.offersData = response.data;
        }
        return response.data; 
    });
  }]);