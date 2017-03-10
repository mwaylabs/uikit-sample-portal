angular.module('mwPortal.SuperPower')

  .service('SuperPowerSelectorModal', function (Modal) {
    return Modal.prepare({
      templateUrl: 'app/modules/super-power/modals/templates/super-power-selector.modal.template.html',
      controller: 'SuperPowerSelectorModalController',
      controllerAs: 'ctrl'
    });
  })

  .controller('SuperPowerSelectorModalController', function (SuperPowerModel, SuperPowersCollection) {
    var self = this;
    var SuperPowerModelExt = SuperPowerModel.extend({
      selectableOptions: function () {
        return {
          isDisabled: function () {
            // This function controls if item can be selected. If it return true it will be not selected when
            // selectAll in the collection is called and the checkboxes in the list are also disabled
            if(self.enabledSuperpowers && self.enabledSuperpowers.length>0){
              return !self.enabledSuperpowers.get(this);
            }
            return false;
          }
        };
      }
    });

    var SuperPowersCollectionExt = SuperPowersCollection.extend({
      model: SuperPowerModelExt,
      selectableOptions: function () {
        return {
          // preSelected can be either a BackboneJS Model or Collection
          // when it is a model the selectable turns into single selection mode
          preSelected: self.selected //you can not use "this" here because selectable has its own scope
        };
      }
    });

    this.superPowers = new SuperPowersCollectionExt();

    this.save = function () {
      // Handle the case that multiple items can be selected because scope.selected is a BackboneJS Collection
      if (!this.superPowers.selectable.isSingleSelection()) {
        this.selected.replace(this.superPowers.selectable.getSelected().toJSON());

        // Handle the case that only one item can be selected because scope.selected is a BackboneJS Model
      } else if (this.superPowers.selectable.isSingleSelection()) {
        // Something has been selected
        if (this.superPowers.selectable.getSelected().first()) {
          this.selected.set(this.superPowers.selectable.getSelected().first().toJSON());

          // Nothing is selected
        } else {
          this.selected.clear();
        }
      }

      this.hideModal();
    };

    this.superPowers.fetch();
  });
