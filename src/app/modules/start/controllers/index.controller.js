angular.module('mwPortal.Start')
  .controller('StartIndexController', function ($http) {
    this.name = 'Mw Uikit';

    this.fetchUnknowRessource = function () {
      $http.get('/abc');
    };

    this.invokeJsException = function () {
      throw new Error('This modal will be displayed when a js exception happens!');
    };
  });
