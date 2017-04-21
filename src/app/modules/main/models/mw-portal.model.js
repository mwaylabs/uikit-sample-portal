angular.module('mwPortal.Main')
  .service('MwPortalModel', function () {
    return mwUI.Backbone.Model.extend({
      hostName: function(){
        if(window.CONFIG.env === 'PRODUCTION'){
          return 'http://52.59.202.190:3000';
        } else {
          return '';
        }
      },
      basePath: '/api',
      parse: function(rsp){
        return rsp.data || rsp;
      }
    });
  });
