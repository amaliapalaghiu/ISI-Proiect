'use strict';

angular.module('myApp.conturi', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/dashboardadmin/conturi', {
      templateUrl: 'dashboardadmin/conturi/conturi.html',
      controller: 'ConturiCtrl'
    });
  }])

  .controller('ConturiCtrl', ['$scope', '$location', '$http', '$uibModal',function($scope, $location, $http, $uibModal) {
    var user = JSON.parse(sessionStorage.user);
    var request = $http.get('http://localhost:3000/api/admin/users').then(function (response) {
          $scope.conturiData = response.data;
        return response.data; 
    });

    $scope.homeClick = function() {
      $location.path('/dashboardadmin');
    }

}
]);