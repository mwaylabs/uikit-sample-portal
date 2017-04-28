angular.module('mwPortal.Start')

  .directive('backboneSelectable', function (MwPortalCollection) {
    return {
      scope: {},
      templateUrl: 'app/modules/start/directives/backbone-module/backbone-selectable/backbone-selectable.template.html',
      link: function (scope) {
        scope.mwPortalCollection = new MwPortalCollection();
        for (var i=0; i<5; i++){
          scope.mwPortalCollection.add({id:i, name: 'Item '+(i+1)});
        }
      }
    };
  });
