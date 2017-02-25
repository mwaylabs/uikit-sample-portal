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

  // Config response handler toasts that are triggered by backend responses
  .config(function (ResponseToastHandlerProvider) {
    // Register a toast type that can be used when you register a toast
    ResponseToastHandlerProvider.registerToastType('info', {
      type: 'primary',  // bootstrap type for background color {info, warning, success, primary, danger}
      autoHide: true,
      autoHideTime: 3000, // optional default 5000
      icon: 'fa-info-circle' // optional (default fa-info)
    });

    ResponseToastHandlerProvider.registerToastType('success', {
      type: 'success',  // bootstrap type for background color {info, warning, success, primary, danger}
      autoHide: true,
      icon: 'fa-check-circle-o' // optional (default fa-info)
    });

    ResponseToastHandlerProvider.registerToastType('error', {
      type: 'danger',  // bootstrap type for background color {info, warning, success, primary, danger}
      autoHide: false,
      icon: 'fa-times-circle' // optional (default fa-info)
    });

    // This toast will be displayed when a request is done and the server responds
    // Every response will be checked if a toast has been registered for
    // When a toast is registered it will be automatically displayed
    // Useful e.g. for server error handling
    ResponseToastHandlerProvider.registerToast(
      '*', // the route for which the toast should react on server response (* = all routes)
      {
        singular: 'main.toasts.serverResponses.error.resourceNotFound.singular', //this message is displayed when the toast is triggered and not visible yet
        plural: 'main.toasts.serverResponses.error.resourceNotFound.plural' // (optional) this message is displayed when a new toast from this type is triggered and the old one is still visible
      },
      {
        methods: ['GET'], // define the methods for which the toast should be displayed {GET, POST, PUT, DELETE}
        statusCodes: [404], // define the http status code for which it should be active
        toastType: 'info' //set the name of one of your registered toast types
      });

    ResponseToastHandlerProvider.registerToast(
      '*', // all routes
      {
        singular: 'main.toasts.serverResponses.error.unknown' // we do not define a plural message here, so the text of the toast is not updated. The toast handler does also not create a new toast
      },
      {
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        onError: true, // by setting on Error true we don't have to specify status codes because all error status codes that don't have a response handler will be matched
        toastType: 'error',
        // By using a preprocess function we can modify the message as we want
        // This function is executed before the toast is displayed. Return type has to be a string
        preProcess: function (msg, serverRspMsg, i18n, serverRsp) {
          if (serverRsp.statusText) {
            return i18n.get(msg, {reason: serverRsp.statusText});
          } else {
            return i18n.get(msg, {reason: 'Unknown'});
          }
        }
      });

    // This toast will be displayed when the server could not be reached
    ResponseToastHandlerProvider.registerToast(
      '*', // all routes
      {
        singular: 'main.toasts.serverResponses.error.serverCouldNotBeReached.singular' // we do not define a plural message here, so the text of the toast is not updated. The toast handler does also not create a new toast
      },
      {
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        statusCodes: [-1], // -1 is returned when the server can not be reached
        toastType: 'info'
      });

    // This toast is displayed when an the server returns a success status code <400
    // We are using registerSuccessToast so we do not heave to define all success status codes by ourselves
    // Display toast when a POST request was successful (item has been created on server)
    ResponseToastHandlerProvider.registerSuccessToast(
      '*', // all routes
      {
        singular: 'main.toasts.serverResponses.success.created.singular',
        plural: 'main.toasts.serverResponses.success.created.plural'
      },
      'POST', // this is the method fo which the toast should be displayed
      'success' // this is the toast type
    );

    // Display toast when a PUT request was successful (item has been updated on server)
    ResponseToastHandlerProvider.registerSuccessToast(
      '*', // all routes
      {
        singular: 'main.toasts.serverResponses.success.updated.singular',
        plural: 'main.toasts.serverResponses.success.updated.plural'
      },
      'PUT', // method
      'success' // toast type
    );

    // Display toast when a DELETE reqeust was successful (item has been deleted from server)
    ResponseToastHandlerProvider.registerSuccessToast(
      '*', // all routes
      {
        singular: 'main.toasts.serverResponses.success.deleted.singular',
        plural: 'main.toasts.serverResponses.success.deleted.plural'
      },
      'DELETE', // method
      'success' // toast type
    );
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

  // We set the locale that should be used for the i18n translations
  // The locale is either defined by a value from local storage or by the browser locale
  .run(function (i18n) {
    var browserLocale = window.navigator.language || window.navigator.browserLanguage,
      userSavedLocale = window.localStorage.getItem('locale');

    // Check if there is an entry in the localstorage. When the user has used the language selector
    // the language selector should save the selected locale in  locale storage
    if (userSavedLocale) {
      i18n.setLocale(userSavedLocale.replace(/"/g, ''));
      // The user has not used the language selector yet so we are checking the locale of the browser
      // as this sample portal only supports german and english we just check if the locale is german
      // otherwise we set it to english
    } else {
      if (browserLocale.indexOf('de') > -1) {
        i18n.setLocale('de_DE');
      } else {
        i18n.setLocale('en_US');
      }
    }
  })

  // Display a toast when the user is loosing connection to the internet and hide the toast when the
  // connection is back on.
  .run(function ($timeout, Toast, i18n) {
    var toast;
    var toggleOfflineToast = function () {
      $timeout(function () {
        // Display toast when user is offline
        if (!navigator.onLine) {
          toast = Toast.addToast(i18n.get('main.toasts.offline.body'), {
            title: i18n.get('main.toasts.offline.title'),
            type: 'primary',
            icon: 'fa-wifi',
            autoHide: false
          });
          // Hide toast when user is back online
        } else {
          if (toast) {
            Toast.removeToast(toast.id);
            toast = null;
          }
        }
      });
    };

    window.addEventListener('online', toggleOfflineToast);
    window.addEventListener('offline', toggleOfflineToast);
  })

  // Display a toast when a new app version (cache manifest has changed) is available. When using the cache manifest
  // the browser is caching all files that are defined in the manifest. When a new version is relased
  // the browser will still display the old version but download the new one in the background
  // The manifest will be genearted by the grunt task called `manifest`
  // Be careful with the cache manifest and make sure that your index.html is not cached by the server
  // If you not sure if the index.html is cached or not remove the grunt manifest task
  // When you don't use the cache manifest you can remove the following block
  .run(function ($timeout, Toast, i18n) {
    var appCache = window.applicationCache;

    var showRelutionUpdateNotification = function () {
      $timeout(function () {
        Toast.addToast(i18n.get('main.toasts.newPortalVersion.body'), {
          title: i18n.get('main.toasts.newPortalVersion.title'),
          type: 'primary',
          autoHide: false,
          button: {
            title: i18n.get('main.toasts.newPortalVersion.action'),
            action: function () {
              document.location.reload();
            },
            isLink: true
          }
        });
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
