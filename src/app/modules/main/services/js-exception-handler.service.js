angular.module('mwPortal.Main')
  .service('jsExceptionOkHandler', function ($q, $timeout, $rootScope, $location) {
    return function (exception) {
      // Async stuff can be done as well. Modal will be closed as soon as
      // the promise is resolved.
      // This can be used to send the exeption to the server
      var dfd = $q.defer();
      $timeout(function () {
        console.log(exception);
        dfd.resolve();
      }, 300);

      $rootScope.$on('$modalCloseSuccess', function () {
        console.info('Restarting the application...');
        $location.path('/');
      });

      return dfd.promise;
    };
  })

  .service('jsExceptionCancelHandler', function ($location) {
    return function () {
      console.info('Restarting the application...');
      $location.path('/');
    };
  });
