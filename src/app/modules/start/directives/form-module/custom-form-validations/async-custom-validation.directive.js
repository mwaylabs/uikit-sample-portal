angular.module('mwPortal.Start')
// normally the config blocks belong in the module "main" file but in this case we put it here
// because it belongs to the directive below and makes it easier to find
  .config(function (mwValidationMessagesProvider) {
    // This is registering a message for a validator that is used by the mw-input-wrapper when the validator is invalid
    mwValidationMessagesProvider.registerValidator(
      'asyncValidation', // name of the validator for which you want to provide a text message
      'start.formModuleDirectives.customFormValidations.validationError' //string to you i18n resource that will be used by i18n to d
    );
  })

  .directive('asyncCustomValidation', function ($q, $timeout, mwValidationMessages, i18n) {
    return {
      require: 'ngModel',
      scope: {
        matchValues: '='
      },
      link: function (scope, elm, attr, ngModel) {
        var matchesValue = function (value) {
          return scope.matchValues.indexOf(value) !== -1;
        };

        // A timeout of 500ms is used to demonstrate the async validation usecase
        // in a real world scenraio you would propably do a server request to check
        // e.g. if a unique value is already in the database
        var asyncTest = function (value) {
          var dfd = $q.defer();
          $timeout(function () {
            if (matchesValue(value)) {
              return dfd.reject(value);
            } else {
              return dfd.resolve();
            }
          }, 500);
          return dfd.promise;
        };

        // we are registering a new validator that will be executed by angular on ngModel changes
        // the name of the validator is also used for the validation message as a key
        ngModel.$asyncValidators.asyncValidation = function (value) {
          return asyncTest(value).then(null, function(result){
              mwValidationMessages.updateMessage(
                'asyncValidation', // name of the validator for which you want to provide a text message
                function(){
                  return i18n.get('start.formModuleDirectives.customFormValidations.validationError', {value: result});
                }
              );
              return $q.reject();
          });
        };

        scope.$watch('matchValues', function () {
          ngModel.$validate();
        });
      }
    };
  });
