angular.module('mwPortal.Main')
  .service('SuperPowerModel', function (MwPortalModel) {
    return MwPortalModel.extend({
      endpoint: '/super-powers'
    });
  });
