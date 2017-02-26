angular.module('mwPortal.Hero', [])
// Config i18n for translations
  .config(function (i18nProvider) {
    i18nProvider.addResource('app/modules/hero/i18n');
  });
