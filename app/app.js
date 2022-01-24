'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'ui.bootstrap',
  'myApp.login',
  'myApp.signup',
  'myApp.dashboardtrans',
  'myApp.dashboardexp',
  'myApp.version',
  'myApp.hartaExp',
  'myApp.cereriExp',
  'myApp.success',
  'myApp.cererileMele',
  'myApp.hartaTrans',
  'myApp.oferteTrans',
  'myApp.camioaneTrans',
  'myApp.listaCereriClienti',
  'myApp.oferteExp',
  'esri.map'
]).

  config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({ redirectTo: '/login' });
  }])
