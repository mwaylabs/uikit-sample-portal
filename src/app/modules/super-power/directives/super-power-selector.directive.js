angular.module('mwPortal.SuperPower')

  .directive('superPowerSelectorBtn', function (MwPortalModel, SuperPowerSelectorModal) {
    return {
      scope: {
        selected: '=',
        mwRequired: '=',
        mwDisabled: '='
      },
      templateUrl: 'app/modules/super-power/directives/templates/super-power-selector.directive.html',
      link: function (scope, elm, attr) {
        var superPowerSelectorModal = new SuperPowerSelectorModal();

        scope.openSuperPowerSelectorModal = function(){
          superPowerSelectorModal.setScopeAttributes({
            selected: scope.selected
          });
          superPowerSelectorModal.show();
        };

        scope.selectedIsModel = function(){
          return scope.selected instanceof MwPortalModel;
        };
      }
    };
  });
