// Do only import sub modules here not config or run stuff
// Configurations should happen in each module
// Common configurations should be done in the main module

angular.module('mwPortal', [
  'ngRoute',
  'ngAnimate',
  'mwUI',

  'mwPortal.Main',
  'mwPortal.Start'
]);
