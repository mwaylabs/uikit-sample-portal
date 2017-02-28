angular.module('mwPortal.Hero')
  .controller('HeroFormController', function ($location, hero) {
    this.hero = hero;

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
