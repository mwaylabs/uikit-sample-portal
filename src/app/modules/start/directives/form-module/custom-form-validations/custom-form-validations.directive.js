angular.module('mwPortal.Start')

  .directive('customFormValidations', function () {
    return {
      scope: {},
      templateUrl: 'app/modules/start/directives/form-module/custom-form-validations/custom-form-validations.template.html',
      link: function (scope) {
        scope.model = new mwUI.Backbone.Model();
      }
    };
  });
