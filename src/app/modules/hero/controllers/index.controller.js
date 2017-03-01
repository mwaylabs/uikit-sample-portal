angular.module('mwPortal.Hero')
  .controller('HeroIndexController', function (HeroDeleteConfirmModal, heroes) {
    var heroDeleteConfirmModal = new HeroDeleteConfirmModal();

    this.heroes = heroes;

    this.showDeleteConfirmModal = function(){
      heroDeleteConfirmModal.setScopeAttributes({
        selected: this.heroes.selectable.getSelected()
      });
      heroDeleteConfirmModal.show();
    };
  })

  .constant('HeroIndexControllerResolver', {
    heroes: ['HeroesCollection', function (HeroesCollection) {
      return ( new HeroesCollection() ).fetch();
    }]
  });
