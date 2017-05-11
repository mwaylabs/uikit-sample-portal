angular.module('mwPortal.Start')

  .directive('inputs', function () {
    return {
      scope: {},
      templateUrl: 'app/modules/start/directives/input-module/inputs/inputs.template.html',
      link: function (scope) {
        var Model = mwUI.Backbone.Model.extend({
          defaults: function(){
           return {
             toggle: true,
             iconToggle: true
           }
          }
        });
        scope.model = new Model();
      }
    };
  });
