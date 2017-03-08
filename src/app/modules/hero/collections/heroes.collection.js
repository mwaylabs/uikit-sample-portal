angular.module('mwPortal.Hero')
  .service('HeroesCollection', function (MwPortalCollection, HeroModel) {
    return MwPortalCollection.extend({
      endpoint: '/heroes',
      model: HeroModel,
      findByNameCaseInSensitive: function(name){
        name = name.toLowerCase();
        return this.find(function(model){
          return model.get('name').toLowerCase() === name;
        });
      }
    });
  });
