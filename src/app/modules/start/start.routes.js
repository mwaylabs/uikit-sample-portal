angular.module('mwPortal.Start')
  .config(function ($routeProvider, $injector) {
    $routeProvider
      .when('/start', {
        templateUrl: 'app/modules/start/templates/index.template.html',
        controller: 'StartIndexController',
        controllerAs: 'ctrl',
        cssClasses: 'start index'
      })

      .when('/start-async', {
        templateUrl: 'app/modules/start/templates/index-async.template.html',
        controller: 'StartIndexAsyncController',
        controllerAs: 'ctrl',
        cssClasses: 'start index-delayed',
        resolve: $injector.get('StartIndexAsyncControllerResolver')
      });
  });
