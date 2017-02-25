angular.module('mwPortal.Main')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/not-found', {
        templateUrl: 'app/modules/main/templates/not-found.template.html',
        controller: 'MainNotFoundController',
        controllerAs: 'ctrl',
        cssClasses: 'main not-found'
      })
      .when('/', {redirectTo: '/start'})
      .otherwise({redirectTo: '/not-found'});

  });
