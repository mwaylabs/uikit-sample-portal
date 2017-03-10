angular.module('mwPortal.SuperPower')

  .service('SuperPowerDeleteConfirmModal', function (Modal) {
    return Modal.prepare({
      templateUrl: 'app/modules/super-power/modals/templates/super-power-delete-confirm.modal.template.html',
      controller: 'SuperPowerDeleteConfirmModalController',
      controllerAs: 'ctrl'
    });
  })

  .controller('SuperPowerDeleteConfirmModalController', function ($scope) {
    this.deleteSelected = function () {
      // use .secureEach() instead of .each() otherwise you will get reference problems http://stackoverflow.com/a/22024432
      this.selected.secureEach(function (model) {
        model.destroy();
      });
    };
  });
