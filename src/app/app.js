// Do only import sub modules here not config or run stuff
// Configurations should happen in each module
// Common configurations should be done in the main module

angular.module('mwPortal', [
  'ngRoute',
  'ngAnimate',
  'mwUI',

  'mwPortal.Start',
  'mwPortal.Hero',
  'mwPortal.SuperPower',

  'mwPortal.Main' // the main module should be at the end so that the configurations are executed on top of the other module configurations
]);
