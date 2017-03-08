angular.module('mwPortal.SuperPower')
  .controller('SuperPowerFormController', function ($location, SuperPowersCollection, superPower) {
    this.superPower = superPower;

    this.goBack = function(){
      $location.path('/super-powers');
    };

    this.save = function(){
      return this.superPower.save().then(function(){
        this.goBack();
      }.bind(this));
    };

    this.cancel = function(){
      this.goBack();
    };
  })

  .constant('SuperPowerFormControllerResolver', {
    superPower: ['$route', 'SuperPowerModel', function ($route, SuperPowerModel) {
      if ($route.current.params.superPowerId) {
        return ( new SuperPowerModel({ id: $route.current.params.superPowerId }) ).fetch();
      } else {
        return new SuperPowerModel();
      }
    }]
  });
