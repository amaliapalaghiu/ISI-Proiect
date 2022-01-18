'use strict';

angular.module('myApp.dashboardtrans', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/dashboardtrans', {
      templateUrl: 'dashboardtrans/dashboardtrans.html',
      controller: 'DashboardTransCtrl'
    });
  }])
  .controller('DashboardTransCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.hartaTransClick = function() {
      $location.path('/dashboardtrans/harta');
    }
    $scope.cereriClientiTransClick = function() {
      $location.path('/dashboardtrans/listacereri');
    }
    $scope.oferteTransClick = function() {
      $location.path('/dashboardtrans/oferte');
    }
    $scope.camioaneTransClick = function() {
      $location.path('/dashboardtrans/camioane');
    }

    $scope.$on('$viewContentLoaded', function() {
      var slideIndex = 0;
      showSlides();

      function showSlides() {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("dot");
        for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";  
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}    
        for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex-1].style.display = "block";  
        dots[slideIndex-1].className += " active";
        if (slideIndex == 4) {
          slideIndex = 0;
        }
        setTimeout(showSlides, 2000);
      }
    })
  }]);