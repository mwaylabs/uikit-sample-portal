angular.module('mwPortal.Start')

  .directive('inputWrapper', function () {
    return {
      scope: {},
      templateUrl: 'app/modules/start/directives/form-module/input-wrapper/input-wrapper.template.html',
      link: function (scope) {
        scope.model = new mwUI.Backbone.Model();
      }
    };
  });
