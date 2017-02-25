angular.module('mwPortal.Main')
  .service('config', function ($http, $q) {
    var dfd = $q.defer();

    $http.get('app/config.json').then(function (rsp) {
      dfd.resolve(rsp.data);
    });

    return {
      getConfig: function () {
        return dfd.promise;
      }
    };
  });
