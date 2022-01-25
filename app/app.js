'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'ui.bootstrap',
  'myApp.login',
  'myApp.signup',

  'myApp.dashboardtrans',
  'myApp.dashboardexp',
  'myApp.dashboardadmin',
  'myApp.conturi',
  'myApp.version',
  'myApp.hartaExp',
  'myApp.cereriExp',
  'myApp.success',
  'myApp.cererileMele',
  'myApp.oferteTrans',
  'myApp.camioaneTrans',
  'myApp.listaCereriClienti',
  'myApp.oferteExp',
  'myApp.contractincheiatExp',
  'myApp.contracteTrans',
  'myApp.contractincheiatTrans',
  'esri.map'
]).

  config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({ redirectTo: '/login' });
  }])
