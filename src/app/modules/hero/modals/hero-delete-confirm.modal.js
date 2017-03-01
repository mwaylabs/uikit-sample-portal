angular.module('mwPortal.Hero')

  .service('HeroDeleteConfirmModal', function (Modal) {
    return Modal.prepare({
      templateUrl: 'app/modules/hero/modals/templates/hero-delete-confirm.modal.template.html',
      controller: 'HeroDeleteConfirmModalController'
    });
  })

  .controller('HeroDeleteConfirmModalController', function ($scope) {
    $scope.deleteSelected = function () {
      $scope.selected.secureEach(function (model) {
        model.destroy();
      });
    };
  });
