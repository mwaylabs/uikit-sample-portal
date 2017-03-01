angular.module('mwPortal.Main')
  .service('MwPortalCollection', function () {
    return mwUI.Backbone.Collection.extend({
      baseUrl: '',
      basePath: '/api',
      parse: function(rsp){
        return rsp.data;
      }
    });
  });
