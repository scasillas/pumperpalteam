'use strict';

angular.module('pumperpalApp.auth', [
  'pumperpalApp.constants',
  'pumperpalApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
