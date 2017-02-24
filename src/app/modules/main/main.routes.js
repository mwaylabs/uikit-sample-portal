angular.module('mwPortal.Main')
  // All routes for this module should be defined in a sep
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {redirectTo: '/start'});
  });
