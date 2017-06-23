angular.module('mwPortal.Main')
  .controller('MainController', function (i18n) {
    this.locales = i18n.getLocales();

    this.setLocale = function (id) {
      i18n.setLocale(id);
      window.localStorage.setItem('locale', id);
    };

    this.isLocaleActive = function(id){
      return i18n.getActiveLocale().id === id;
    };

    this.getCurrentYear = function () {
      return (new Date()).getFullYear();
    };

    this.getAppversion = function () {
      return window.CONFIG.version;
    };
  });
