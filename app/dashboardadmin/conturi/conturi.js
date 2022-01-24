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

    $scope.openModalUser  = function(){
        $uibModal.open({
          templateUrl : '/dashboardadmin/conturi/addUserModal.html',
          backdrop: true
        });
      };

      $scope.submitCont = function () {
        //console.log($scope.cont);
        if ($scope.cont.userType === "Transportator") {
            $http({
              method: 'POST',
              url: 'http://localhost:3000/api/users/add',
              data: { 
                username: $scope.cont.username,
                passwrd: $scope.cont.password,
                firstName: $scope.cont.firstName, 
                lastName: $scope.cont.lastName,
                telephone: $scope.cont.telephone,
                email: $scope.cont.email,
                user_type: 1
              }
            }).then(function successCallback(response) {
                window.location.reload();
              }, function errorCallback(response) {
                
              });
          } else if ($scope.cont.userType === "Expeditor") {
            $http({
              method: 'POST',
              url: 'http://localhost:3000/api/users/add',
              data: { 
                username: $scope.cont.username,
                passwrd: $scope.cont.password,
                firstName: $scope.cont.firstName, 
                lastName: $scope.cont.lastName,
                telephone: $scope.cont.telephone,
                email: $scope.cont.email,
                user_type: 2
              }
            }).then(function successCallback(response) {
                window.location.reload();
              }, function errorCallback(response) {
                
              });
          } else if ($scope.cont.userType === "Admin") {
            $http({
              method: 'POST',
              url: 'http://localhost:3000/api/users/add',
              data: { 
                username: $scope.cont.username,
                passwrd: $scope.cont.password,
                firstName: $scope.cont.firstName, 
                lastName: $scope.cont.lastName,
                telephone: $scope.cont.telephone,
                email: $scope.cont.email,
                user_type: 3
              }
            }).then(function successCallback(response) {
                window.location.reload();
              }, function errorCallback(response) {
                
              });
          }
      }

}
]);