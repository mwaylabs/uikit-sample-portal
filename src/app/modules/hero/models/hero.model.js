angular.module('mwPortal.Hero')
  .service('HeroModel', function (MwPortalModel, SuperPowerModel, SuperPowersCollection) {
    return MwPortalModel.extend({
      endpoint: '/heroes',
      // This is a nested attribute. That means when the attribute superPowers is set with an array
      // it is automatically resolved into the defined collection
      // So when you call model.get('superPowers') you will get a collection instead of an array
      nested: function () {
        return {
          superPowers: SuperPowersCollection,
          strongestSuperPower: SuperPowerModel
        };
      },
      hasSuperPower: function(superPower){
        return !!this.get('superPowers').get(superPower);
      }
    });
  });
