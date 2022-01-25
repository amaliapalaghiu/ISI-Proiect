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

      $scope.acceptareOfertaExp = async function(idx) {
        //console.log($scope.offersData[idx]);
        sessionStorage.camionId = $scope.offersData[idx].camionid;
      $uibModal.open({
        templateUrl : '/dashboardexp/oferte/alegeCerereModal.html',
        backdrop: true
      });

        var dateexp = await $http.get('http://localhost:3000/api/expeditori/' + user.userid).then(function (response) {
          sessionStorage.expeditorId = JSON.stringify(response.data[0].expeditorid);
          return response.data;
      });

      var datetrans = await $http.get('http://localhost:3000/api/expeditori/datetrans/' + $scope.offersData[idx].camionid).then(function (response) {
       
      sessionStorage.transportatorId = JSON.stringify(response.data.transportatorid); 
        return response.data;
      });
      //console.log(datetrans);

      }

        $scope.submitCerereId = function () {
          sessionStorage.cerereId = $scope.x.idCerere;
          //console.log(sessionStorage.transportatorId + sessionStorage.expeditorId);
          $http({
            method: 'POST',
            url: 'http://localhost:3000/api/expeditori/contracte',
            data: { 
              transportatorid: sessionStorage.transportatorId,
              expeditorid: sessionStorage.expeditorId,
              cerereid: $scope.x.idCerere
            }
          }).then(function (response) {
           // window.location.reload();
                $location.path('/dashboardexp/contractincheiat')
                //window.location.reload();
               
          });
         // window.location.reload();
      }



  }]);