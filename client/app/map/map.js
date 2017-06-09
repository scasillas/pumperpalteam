'use strict';

angular.module('pumperpalApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('map', {
				url: '/map/:zip',
        template: '<map></map>'
      });
  });
