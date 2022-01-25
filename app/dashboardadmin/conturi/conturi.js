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

      $scope.modificaUtilizator = function(idx) {
        sessionStorage.dateUserDeModificat = JSON.stringify($scope.conturiData[idx]);
        $uibModal.open({
          templateUrl : '/dashboardadmin/conturi/modificaUserModal.html',
          backdrop: true
        });
      }

      $scope.submitModificareDate = function () {
        $scope.dateVechi = JSON.parse(sessionStorage.dateUserDeModificat);

        var dateUpdate = {};
        if ($scope.dateNoi.hasOwnProperty('firstName')) {
          dateUpdate.firstName = $scope.dateNoi.firstName;
        } else {
          dateUpdate.firstName = $scope.dateVechi.firstname;
        }

        if ($scope.dateNoi.hasOwnProperty('lastName')) {
          dateUpdate.lastName = $scope.dateNoi.lastName;
        } else {
          dateUpdate.lastName = $scope.dateVechi.lastname;
        }

        if ($scope.dateNoi.hasOwnProperty('telephone')) {
          dateUpdate.telefon = $scope.dateNoi.telephone;
        } else {
          dateUpdate.telefon = $scope.dateVechi.telefon;
        }

        if ($scope.dateNoi.hasOwnProperty('email')) {
          dateUpdate.email = $scope.dateNoi.email;
        } else {
          dateUpdate.email = $scope.dateVechi.email;
        }
        dateUpdate.username = $scope.dateVechi.username;

        $http({
          method: 'POST',
          url: 'http://localhost:3000/api/admin/modificaDate',
          data: {
            username: dateUpdate.username,
            firstname: dateUpdate.firstName,
            lastname: dateUpdate.lastName,
            telefon: dateUpdate.telefon, 
            email: dateUpdate.email
          }
        }).then(function successCallback(response) {
          window.location.reload();
          }, function errorCallback(response) {
            
          });
      }

}
]);