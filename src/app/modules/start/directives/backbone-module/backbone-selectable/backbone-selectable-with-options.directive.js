angular.module('mwPortal.Start')

  .directive('backboneSelectableWithOptions', function (MwPortalModel, MwPortalCollection) {
    return {
      scope: {
        isSingleSelection: '=',
        disabledItems: '=',
        preSelectedItems: '='
      },
      templateUrl: 'app/modules/start/directives/backbone-module/backbone-selectable/backbone-selectable-with-options.template.html',
      link: function (scope) {
        var preSelected;

        var Model = MwPortalModel.extend({
          selectableOptions: function(){
            return {
              isDisabled: function(){
                if(_.isArray(scope.disabledItems)){
                  return scope.disabledItems.indexOf(this.get('id')) >= 0;
                } else {
                  return false;
                }
              }
            };
          }
        });

        var Collection = MwPortalCollection.extend({
          model: Model,
          selectableOptions: function(){
            return {
              isSingleSelection: scope.isSingleSelection,
              preSelected: preSelected
            };
          }
        });

        if(scope.preSelectedItems){
          preSelected = new MwPortalCollection();
          scope.preSelectedItems.forEach(function(id){
            preSelected.add({id: id});
          });
        }

        scope.mwPortalCollection = new Collection();
        for (var i=0; i<5; i++){
          scope.mwPortalCollection.add({id:i, name: 'Item '+(i+1)});
        }
      }
    };
  });
