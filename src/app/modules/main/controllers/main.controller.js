angular.module('mwPortal.Main')
  .controller('MainController', function (i18n, config) {
    var version = '';
    this.locales = i18n.getLocales();

    this.setLocale = function (id) {
      i18n.setLocale(id);
      window.localStorage.setItem('locale', id);
    };

    this.getCurrentYear = function () {
      return (new Date()).getFullYear();
    };

    this.getAppversion = function () {
      return version;
    };

    config.getConfig().then(function (config) {
      version = config.version;
    });
  });
