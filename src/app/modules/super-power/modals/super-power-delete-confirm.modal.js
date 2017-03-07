angular.module('mwPortal.SuperPower')

  .service('SuperPowerDeleteConfirmModal', function (Modal) {
    return Modal.prepare({
      templateUrl: 'app/modules/super-power/modals/templates/super-power-delete-confirm.modal.template.html',
      controller: 'SuperPowerDeleteConfirmModalController'
    });
  })

  .controller('SuperPowerDeleteConfirmModalController', function ($scope) {
    $scope.deleteSelected = function () {
      // use .secureEach() instead of .each() otherwise you will get reference problems http://stackoverflow.com/a/22024432
      $scope.selected.secureEach(function (model) {
        model.destroy();
      });
    };
  });
