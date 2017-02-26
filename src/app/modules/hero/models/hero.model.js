angular.module('mwPortal.Main')
  .service('HeroModel', function (MwPortalModel) {
    return MwPortalModel.extend({
      endpoint: '/heroes'
    });
  });
