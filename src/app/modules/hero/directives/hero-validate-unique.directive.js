angular.module('mwPortal.Hero')
  .directive('heroValidateUnique', function (mwValidationMessages, i18n, HeroesCollection) {
    return {
      require: 'ngModel',
      scope: {
        validate: '=heroValidateUnique'
      },
      link: function (scope, elm, attr, ngModel) {
        var heroes = new HeroesCollection();

        var validateHero = function (value) {
          return value && value.length && (angular.isUndefined(scope.validate) || scope.validate);
        };

        ngModel.$validators.heroUnique = function (value) {
          if (validateHero(value)) {
            return !heroes.findWhere({name: value});
          } else {
            return true;
          }
        };

        heroes.fetch().then(function () {
          ngModel.$validate();
        });
      }
    };
  });
