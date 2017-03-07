angular.module('mwPortal.SuperPower')
  .controller('SuperPowerIndexController', function (SuperPowerDeleteConfirmModal, superPowers) {
    var superPowerDeleteConfirmModal = new SuperPowerDeleteConfirmModal();

    this.superPowers = superPowers;

    this.showDeleteConfirmModal = function(){
      // prepare the modal and set all attributes that are needed in the modal
      superPowerDeleteConfirmModal.setScopeAttributes({
        // this attribute will be available in the modal controller
        selected: this.superPowers.selectable.getSelected()
      });

      // show the modal
      superPowerDeleteConfirmModal.show();
    };
  })

  .constant('SuperPowerIndexControllerResolver', {
    superPowers: ['SuperPowersCollection', function (SuperPowersCollection) {
      return ( new SuperPowersCollection() ).fetch();
    }]
  });
