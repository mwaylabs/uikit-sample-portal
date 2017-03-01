angular.module('mwPortal.Main')
  .service('SuperPowersCollection', function (MwPortalCollection, SuperPowerModel) {
    return MwPortalCollection.extend({
      endpoint: '/super-powers',
      model: SuperPowerModel
    });
  });
