angular.module('mwPortal.Hero')
  .config(function ($routeProvider, $injector) {
    $routeProvider
      .when('/heroes', {
        templateUrl: 'app/modules/hero/templates/index.template.html',
        controller: 'HeroIndexController',
        controllerAs: 'ctrl',
        cssClasses: 'hero index',
        resolve: $injector.get('HeroIndexControllerResolver')
      })
      .when('/heroes/new', {
        templateUrl: 'app/modules/hero/templates/new.template.html',
        controller: 'HeroFormController',
        controllerAs: 'ctrl',
        cssClasses: 'hero form new',
        resolve: $injector.get('HeroFormControllerResolver')
      })
      .when('/heroes/:heroId/edit', {
        templateUrl: 'app/modules/hero/templates/edit.template.html',
        controller: 'HeroFormController',
        controllerAs: 'ctrl',
        cssClasses: 'hero form edit',
        resolve: $injector.get('HeroFormControllerResolver')
      });
  });
