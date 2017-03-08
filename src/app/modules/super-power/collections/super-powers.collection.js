angular.module('mwPortal.SuperPower')
  .service('SuperPowersCollection', function (MwPortalCollection, SuperPowerModel) {
    return MwPortalCollection.extend({
      endpoint: '/super-powers',
      model: SuperPowerModel
    });
  });
