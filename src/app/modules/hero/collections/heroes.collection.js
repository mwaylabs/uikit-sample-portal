angular.module('mwPortal.Main')
  .service('HeroesCollection', function (MwPortalCollection, HeroModel) {
    return MwPortalCollection.extend({
      endpoint: '/heroes',
      model: HeroModel
    });
  });
