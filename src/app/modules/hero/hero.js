angular.module('mwPortal.Hero', [])
// Config i18n for translations
  .config(function (i18nProvider) {
    i18nProvider.addResource('app/modules/hero/i18n');
  })

  // Config response handler toasts that are triggered by backend responses
  .config(function (ResponseToastHandlerProvider) {
    // Display toast when a POST request on the route was successful (item has been created on server)
    ResponseToastHandlerProvider.registerSuccessToast(
      '/api/heroes', // /api/heroes route
      {
        singular: 'hero.toasts.serverResponses.success.created.singular',
        plural: 'hero.toasts.serverResponses.success.created.plural'
      },
      'POST', // this is the method fo which the toast should be displayed
      'success' // this is the toast type
    );

    // Display toast when a PUT request on the route was successful (item has been updated on server)
    ResponseToastHandlerProvider.registerSuccessToast(
      '/api/heroes/*', // /api/heroes/{id} route
      {
        singular: 'hero.toasts.serverResponses.success.updated.singular',
        plural: 'hero.toasts.serverResponses.success.updated.plural'
      },
      'PUT', // method
      'success' // toast type
    );

    // Display toast when a DELETE request on the route was successful (item has been deleted from server)
    ResponseToastHandlerProvider.registerSuccessToast(
      '/api/heroes/*', // /api/heroes/{id} route
      {
        singular: 'hero.toasts.serverResponses.success.deleted.singular',
        plural: 'hero.toasts.serverResponses.success.deleted.plural'
      },
      'DELETE', // method
      'success' // toast type
    );
  });
