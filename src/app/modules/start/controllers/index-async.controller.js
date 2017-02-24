angular.module('mwPortal.Start')
  .controller('StartIndexAsyncController', function (asyncData, asyncData2) {
    this.title = asyncData.pageTitle;
    this.meta = asyncData2.metaData;
  })

  // This is the preresolver that loads data needed by the actual controller
  // During the loading time a loading spinner is displayed
  // When all promises are resolved the actual controller will be instantiated and the data
  // of the resolver is injected
  // You can define multiple objects. The name of the object is also the name of the injector.
  // The defined objects are resolved in parallel
  .constant('StartIndexAsyncControllerResolver', {
    asyncData: ['$q', '$timeout', function ($q, $timeout) {
      var dfd = $q.defer();
      $timeout(function () {
        dfd.resolve({
          pageTitle: 'Async Data'
        });
      }, 500);
      return dfd.promise;
    }],
    asyncData2: ['$q', '$timeout', function ($q, $timeout) {
      var dfd = $q.defer();
      $timeout(function () {
        dfd.resolve({
          metaData: 'Meta data'
        });
      }, 300);
      return dfd.promise;
    }]
  });
