angular.module('mwPortal.SuperPower')
  .controller('SuperPowerIndexController', function (SuperPowerDeleteConfirmModal, HeroesCollection, superPowers) {
    var superPowerDeleteConfirmModal = new SuperPowerDeleteConfirmModal();
    var heroes = new HeroesCollection();

    this.superPowers = superPowers;

    this.showDeleteConfirmModal = function () {
      // prepare the modal and set all attributes that are needed in the modal
      superPowerDeleteConfirmModal.setScopeAttributes({
        // this attribute will be available in the modal controller
        selected: this.superPowers.selectable.getSelected()
      });

      // show the modal
      superPowerDeleteConfirmModal.show();
    };

    // Iterate over all heroes and check if at least one has the super power
    this.canDeleteSuperPower = function (superPower) {
      var canDelete = true;
      heroes.each(function (hero) {
        if (canDelete) {
          canDelete = !hero.hasSuperPower(superPower);
        }
      });
      return canDelete;
    };

    // Iterate over all selected super powers and check if one of them is applied on a hero
    this.canDeleteSelectedSuperPowers = function () {
      var canDelete = true;
      this.superPowers.selectable.getSelected().each(function (superPower) {
        if (canDelete) {
          canDelete = this.canDeleteSuperPower(superPower);
        }
      }.bind(this));
      return canDelete;
    };

    heroes.fetch();
  })

  .constant('SuperPowerIndexControllerResolver', {
    superPowers: ['SuperPowersCollection', function (SuperPowersCollection) {
      return ( new SuperPowersCollection() ).fetch();
    }]
  });
