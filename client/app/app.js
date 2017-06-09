'use strict';

angular.module('pumperpalApp', [
  'pumperpalApp.auth',
  'pumperpalApp.admin',
  'pumperpalApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
])
  .config(function($urlRouterProvider, $locationProvider) {

    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  }); 
