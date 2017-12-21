'use strict';

/**
 * File di configurazione e gestione delle rotte
 */

angular.module('clientApp').config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl',
      controllerAs: 'ctrl'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'ctrl'
    })
    .when('/signup', {
      templateUrl: 'views/signup.html',
      controller: 'SignupCtrl',
      controllerAs: 'ctrl'
    })
    .when('/browser', {
      templateUrl: 'views/fileBrowser.html',
      controller: 'BrowserCtrl',
      controllerAs: 'ctrl'
    })
    .when('/404', {
      templateUrl: '404.html'
    })
});
