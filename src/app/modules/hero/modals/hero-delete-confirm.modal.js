angular.module('mwPortal.Hero')

  .service('HeroDeleteConfirmModal', function (Modal) {
    return Modal.prepare({
      templateUrl: 'app/modules/hero/modals/templates/hero-delete-confirm.modal.template.html',
      controller: 'HeroDeleteConfirmModalController'
    });
  })

  .controller('HeroDeleteConfirmModalController', function ($scope) {
    $scope.deleteSelected = function () {
      // use .secureEach() instead of .each() otherwise you will get reference problems http://stackoverflow.com/a/22024432
      $scope.selected.secureEach(function (model) {
        model.destroy();
      });
    };
  });
