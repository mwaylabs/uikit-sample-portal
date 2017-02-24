angular.module('mwPortal.Main', [])
  // Config i18n for translations
  .config(function (i18nProvider) {
    // Register all locales that you provide translations for
    i18nProvider.addLocale(
      'de_DE', //id of the locale
      'Deutsch', //label of the locale that can be used e.g. in a language selector
      'de_DE.json' //file name with extension
    );
    i18nProvider.addLocale('en_US', 'English (US)', 'en_US.json');

    //register a path where translations for the registered locales can be found
    //during initialisation or when the locale is changed it will automatically load all
    //registered resource of the selected locale
    //e.g. when en_US is selected it will load the file app/modules/main/i18n/en_US.json
    i18nProvider.addResource('app/modules/main/i18n');
  })

  // Config toasts
  .config(function (ResponseToastHandlerProvider) {
    // Register a toast type that can be used when you register a toast
    ResponseToastHandlerProvider.registerToastType('info', {
      type: 'primary',  // bootstrap type for background color {info, warning, success, primary, danger}
      autoHide: true,
      autoHideTime: 3000, // optional default 5000
      icon: 'fa-times-circle' // optional (default fa-info)

    });

    // This toast will be displayed when a request is done and the server responds
    // Every response will be checked if a toast has been registered for
    // When a toast is registered it will be automatically displayed
    // Useful e.g. for server error handling
    ResponseToastHandlerProvider.registerToast(
      '*', // the route for which the toast should react on server response (* = all routes)
      {
        singular: 'main.errors.resourceNotFound.singular', //this message is displayed when the toast is triggered and not visible yet
        plural: 'main.errors.resourceNotFound.plural' //this message is displayed when a new toast from this type is triggered and the old one is still visible
      },
      {
        methods: ['GET'], // define the methods for which the toast should be displayed {GET, POST, PUT, DELETE}
        statusCodes: [404], // define the http status code for which it should be active
        toastType: 'info' //set the name of one of your registered toast types
      });
  })

  // Config the javascript exception handler. When a js exception is thrown a modal
  // is displayed notifying the user that something went wrong with the application
  .config(function (exceptionHandlerModalProvider) {
    //This is optional. By doing this you can define any further actions that should be done
    //when a javascript exception happens. By default only a modal will be dsipalyed notifying the user
    //that something went wrong
    //The successCallback will be called when the user clicks on the "Report Bug" button
    //The errorCallback when she clicks on cancel
    exceptionHandlerModalProvider.setModalOptions({
      successCallback: 'jsExceptionOkHandler', // optional, can be a string to a service or a function
      errorCallback: 'jsExceptionCancelHandler', //optional, can be a string to a service or a function
      displayException: true //default false
    });
  })

  // Config cache manifest update available action. When using the cache manifest
  // the browser is caching all files that are defined in the manifest. When a new version is relased
  // the browser will still display the old version but download the new one in the background
  // The manifest will be genearted by the grunt task called `manifest`
  // Be careful with the cache manifest and make sure that your index.html is not cached by the server
  // If you not sure if the index.html is cached or not remove the grunt manifest task
  // When you don't use the cache manifest you can remove the following block
  .run(function(Toast, i18n){
    var appCache = window.applicationCache;

    var showRelutionUpdateNotification = function () {
      Toast.addToast(i18n.get('main.newPortalVersion.body'), {
        title: i18n.get('main.newPortalVersion.title'),
        type: 'primary',
        autoHide: false,
        button: {
          title: i18n.get('main.newPortalVersion.action'),
          action: function () {
            document.location.reload();
          },
          isLink: true
        }
      });
    };

    // Fired when the manifest resources have been newly redownloaded.
    appCache.addEventListener('updateready', showRelutionUpdateNotification, false);

    // Check every 15m if a new version is available
    window.setInterval(function () {
      if (appCache.status === 1) {
        appCache.update();
      }
    }, 1000 * 60 * 15);
  });
