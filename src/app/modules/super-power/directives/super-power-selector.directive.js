angular.module('mwPortal.SuperPower')

  .directive('superPowerSelectorBtn', function (MwPortalModel, SuperPowerSelectorModal) {
    return {
      scope: {
        selected: '=',
        enabledSuperpowers: '=',
        mwRequired: '=',
        mwDisabled: '='
      },
      templateUrl: 'app/modules/super-power/directives/templates/super-power-selector.directive.template.html',
      link: function (scope) {
        var superPowerSelectorModal = new SuperPowerSelectorModal();

        scope.openSuperPowerSelectorModal = function(){
          superPowerSelectorModal.setScopeAttributes({
            selected: scope.selected,
            enabledSuperpowers: scope.enabledSuperpowers
          });
          superPowerSelectorModal.show();
        };

        scope.selectedIsModel = function(){
          return scope.selected instanceof MwPortalModel;
        };
      }
    };
  });
