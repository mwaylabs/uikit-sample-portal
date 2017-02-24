angular.module('mwPortal.Main')
  .controller('MainController', function (i18n) {
    this.locales = i18n.getLocales();

    this.setLocale = function (id) {
      i18n.setLocale(id);
    };
  });
