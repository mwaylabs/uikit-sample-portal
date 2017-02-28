angular.module('mwPortal.Start')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/start', {
        templateUrl: 'app/modules/start/templates/index.template.html',
        controller: 'StartIndexController',
        controllerAs: 'ctrl',
        cssClasses: 'start index'
      });
  });
