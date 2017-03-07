angular.module('mwPortal.SuperPower')
  .service('SuperPowerModel', function (MwPortalModel) {
    return MwPortalModel.extend({
      endpoint: '/super-powers'
    });
  });
