angular.module('mwPortal.SuperPower')
  .config(function ($routeProvider, $injector) {
    $routeProvider
      .when('/super-powers', {
        templateUrl: 'app/modules/super-power/templates/index.template.html',
        controller: 'SuperPowerIndexController',
        controllerAs: 'ctrl',
        cssClasses: 'super-power index',
        resolve: $injector.get('SuperPowerIndexControllerResolver')
      })
      .when('/super-powers/new', {
        templateUrl: 'app/modules/super-power/templates/new.template.html',
        controller: 'SuperPowerFormController',
        controllerAs: 'ctrl',
        cssClasses: 'super-power form new',
        resolve: $injector.get('SuperPowerFormControllerResolver')
      })
      .when('/super-powers/:superPowerId/edit', {
        templateUrl: 'app/modules/super-power/templates/edit.template.html',
        controller: 'SuperPowerFormController',
        controllerAs: 'ctrl',
        cssClasses: 'super-power form edit',
        resolve: $injector.get('SuperPowerFormControllerResolver')
      });
  });
