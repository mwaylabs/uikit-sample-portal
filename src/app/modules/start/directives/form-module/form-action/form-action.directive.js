angular.module('mwPortal.Start')

  .directive('formAction', function ($q, $timeout, Toast) {
    return {
      scope: {},
      templateUrl: 'app/modules/start/directives/form-module/form-action/form-action.template.html',
      link: function (scope) {
        var Model = mwUI.Backbone.Model.extend({
          defaults: function(){
            return {
              mwRequiredInputWrapper: 'Xyz',
              mwErrorInputWrapper: null
            };
          }
        });

        var mockSave = function(){
          var dfd = $q.defer();
          $timeout(function(){
            console.log('Model was mocked saved!', scope.model.toJSON());
            dfd.resolve();
          },500);
          return dfd.promise;
        };

        scope.cancel = function(){
          scope.model.set(scope.model.defaults());
        };

        scope.save = function(){
          // For demonstration purposes the data is not submitted to a server
          return mockSave().then(function(){
            Toast.addToast(scope.model.get('mwRequiredInputWrapper')+' was saved!', {autoHide: true});
          });
          // However, in a real world scenario you would send the data of the model to a server
          //return scope.model.save()
        };

        scope.model = new Model();
      }
    };
  });
