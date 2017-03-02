angular.module('mwPortal.Hero')
  .controller('HeroFormController', function ($location, SuperPowersCollection, hero) {
    this.hero = hero;
    this.superPowers = new SuperPowersCollection();
    this.goBack = function(){
      $location.path('/heroes');
    };

    this.save = function(){
      return this.hero.save().then(function(){
        this.goBack();
      }.bind(this));
    };

    this.cancel = function(){
      this.goBack();
    };

    // you can also fetch the superPowers in the preresolver, but as it is not super important for the view
    // we can also do it here to speed up the time the user has to view until the view is displayed
    this.superPowers.fetch();
  })

  .constant('HeroFormControllerResolver', {
    hero: ['$route', 'HeroModel', function ($route, HeroModel) {
      if ($route.current.params.heroId) {
        return ( new HeroModel({ id: $route.current.params.heroId }) ).fetch();
      } else {
        return new HeroModel();
      }
    }]
  });
