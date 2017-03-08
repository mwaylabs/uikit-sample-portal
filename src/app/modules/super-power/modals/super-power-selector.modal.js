angular.module('mwPortal.SuperPower')

  .service('SuperPowerSelectorModal', function (Modal) {
    return Modal.prepare({
      templateUrl: 'app/modules/super-power/modals/templates/super-power-selector.modal.template.html',
      controller: 'SuperPowerSelectorModalController'
    });
  })

  .controller('SuperPowerSelectorModalController', function ($scope, SuperPowerModel, SuperPowersCollection) {
    var SuperPowerModelExt = SuperPowerModel.extend({
      selectableOptions: function () {
        return {
          isDisabled: function () {
            // This function controls if item can be selected. If it return true it will be not selected when
            // selectAll in the collection is called and the checkboxes in the list are also disabled
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
          preSelected: $scope.selected
        };
      }
    });

    $scope.superPowers = new SuperPowersCollectionExt();

    $scope.save = function () {
      // Handle the case that multiple items can be selected because scope.selected is a BackboneJS Collection
      if (!$scope.superPowers.selectable.isSingleSelection()) {
        $scope.selected.replace($scope.superPowers.selectable.getSelected().toJSON());

        // Handle the case that only one item can be selected because scope.selected is a BackboneJS Model
      } else if ($scope.superPowers.selectable.isSingleSelection()) {
        // Something has been selected
        if ($scope.superPowers.selectable.getSelected().first()) {
          $scope.selected.set($scope.superPowers.selectable.getSelected().first().toJSON());

          // Nothing is selected
        } else {
          $scope.selected.clear();
        }
      }
      $scope.hideModal();
    };

    $scope.superPowers.fetch();
  });
