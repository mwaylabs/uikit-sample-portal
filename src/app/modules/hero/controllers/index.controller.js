angular.module('mwPortal.Hero')
  .controller('HeroIndexController', function (HeroDeleteConfirmModal, heroes) {
    // Create an instance of the delete confirm modal
    var heroDeleteConfirmModal = new HeroDeleteConfirmModal();

    this.heroes = heroes;

    this.showDeleteConfirmModal = function(){
      // prepare the modal and set all attributes that are needed in the modal
      heroDeleteConfirmModal.setScopeAttributes({
        // this attribute will be available in the modal controller
        selected: this.heroes.selectable.getSelected()
      });

      // show the modal
      heroDeleteConfirmModal.show();
    };
  })

  .constant('HeroIndexControllerResolver', {
    heroes: ['HeroesCollection', function (HeroesCollection) {
      return ( new HeroesCollection() ).fetch();
    }]
  });
