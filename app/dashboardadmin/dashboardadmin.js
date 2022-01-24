'use strict';

angular.module('myApp.dashboardadmin', ['ngRoute'])

	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/dashboardadmin', {
			templateUrl: 'dashboardadmin/dashboardadmin.html',
			controller: 'DashboardAdminCtrl'
		});
	}])
	.controller('DashboardAdminCtrl', ['$scope', '$location', function ($scope, $location) {
		$scope.hartaTransClick = function () {
			$location.path('/dashboardtrans/harta');
		}
		$scope.conturiUtilizatoriClick = function () {
			$location.path('/dashboardadmin/conturi');
		}


		$scope.$on('$viewContentLoaded', function () {
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
				if (slideIndex > slides.length) { slideIndex = 1 }
				for (i = 0; i < dots.length; i++) {
					dots[i].className = dots[i].className.replace(" active", "");
				}
				slides[slideIndex - 1].style.display = "block";
				dots[slideIndex - 1].className += " active";
				if (slideIndex == 4) {
					slideIndex = 0;
				}
				setTimeout(showSlides, 2000);
			}
		})
	}]);