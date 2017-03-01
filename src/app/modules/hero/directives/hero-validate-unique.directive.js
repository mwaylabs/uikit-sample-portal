angular.module('mwPortal.Hero')
  // normally the config blocks belong in the module "main" file but in this case we put it here
  // because it belongs to the directive below and makes it easier to find
  .config(function(mwValidationMessagesProvider){
    // This is registering a message for a validator that is used by the mw-input-wrapper when the validator is invalid
    mwValidationMessagesProvider.registerValidator(
      'heroUnique', // name of the validator for which you want to provide a text message
      'hero.validators.notUnique' //string to you i18n resource that will be used by i18n to d
    );
  })

  .directive('heroValidateUnique', function (i18n, mwValidationMessages, HeroesCollection) {
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

        // we are registering a new validate that will be executed by angular on ngModel changes
        // the name of the validator is also used for the validation message as a key
        ngModel.$validators.heroUnique = function (value) {
          if (validateHero(value)) {
            var existingHero = heroes.findByNameCaseInSensitive(value);
            if(existingHero){
              //We update the existing validation message so can display the name of the already existing hero
              mwValidationMessages.updateMessage(
                'heroUnique', // name of the validator for which you want to provide a text message
                function(){
                  return i18n.get('hero.validators.notUnique', {name: value});
                }
              );
            }
            // When the validator returns false the ngModel becomes invalid
            // The mw-input-wrapper displays the registered error message. When no message is registered it is just red
            return !existingHero;
          } else {
            return true;
          }
        };

        heroes.fetch().then(function () {
          // trigger a validation after the heroes are fetched
          ngModel.$validate();
        });
      }
    };
  });
