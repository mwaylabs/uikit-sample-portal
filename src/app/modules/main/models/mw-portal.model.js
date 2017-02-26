angular.module('mwPortal.Main')
  .service('MwPortalModel', function () {
    return mwUI.Backbone.Model.extend({
      baseUrl: '',
      basePath: '/api',
      parse: function(rsp){
        return rsp.data || rsp;
      }
    });
  });
