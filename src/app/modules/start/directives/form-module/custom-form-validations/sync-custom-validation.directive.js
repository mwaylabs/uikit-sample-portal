angular.module('mwPortal.Start')
  // normally the config blocks belong in the module "main" file but in this case we put it here
  // because it belongs to the directive below and makes it easier to find
  .config(function(mwValidationMessagesProvider){
    // This is registering a message for a validator that is used by the mw-input-wrapper when the validator is invalid
    mwValidationMessagesProvider.registerValidator(
      'syncValidation', // name of the validator for which you want to provide a text message
      'start.formModuleDirectives.customFormValidations.validationError' //string to you i18n resource that will be used by i18n to d
    );
  })

  .directive('syncCustomValidation', function (mwValidationMessages, i18n) {
    return {
      require: 'ngModel',
      scope: {
        matchValue: '@'
      },
      link: function (scope, elm, attr, ngModel) {
        // we are registering a new validator that will be executed by angular on ngModel changes
        // the name of the validator is also used for the validation message as a key
        ngModel.$validators.syncValidation = function (value) {
          return value !== scope.matchValue;
        };

        scope.$watch('matchValue', function(value){
          mwValidationMessages.updateMessage(
            'syncValidation', // name of the validator for which you want to provide a text message
            function(){
              return i18n.get('start.formModuleDirectives.customFormValidations.validationError', {value: value});
            }
          );
          ngModel.$validate();
        });
      }
    };
  });
