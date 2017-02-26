angular.module('mwPortal.Hero')
  .controller('HeroFormController', function ($location, hero) {
    this.hero = hero;

    this.save = function(){
      this.hero.save().then(function(){
        $location.path('/heroes');
      });
    }
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
