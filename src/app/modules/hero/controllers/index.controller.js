angular.module('mwPortal.Hero')
  .controller('HeroIndexController', function (heroes) {
    this.heroes = heroes;

    this.deleteSelected = function(){
      this.heroes.selectable.getSelected().secureEach(function(model){
        model.destroy();
      });
    }
  })

  .constant('HeroIndexControllerResolver', {
    heroes: ['HeroesCollection', function (HeroesCollection) {
      return ( new HeroesCollection() ).fetch();
    }]
  });
