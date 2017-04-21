angular.module('mwPortal.Main')
  .service('MwPortalCollection', function () {
    return mwUI.Backbone.Collection.extend({
      hostName: function(){
        if(window.CONFIG.env === 'PRODUCTION'){
          return 'http://52.59.202.190:3000';
        } else {
          return '';
        }
      },
      basePath: '/api',
      parse: function(rsp){
        return rsp.data;
      }
    });
  });
