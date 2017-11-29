'use strict';

angular.module('clientApp')
  .controller('MainCtrl', ['$scope', '$rootScope', '$compile', '$http', '$location', 'authFactory', function ($scope, $rootScope, $compile, $http, $location, authFactory) {
    var ctrl = this;

    ctrl.redirectTo = redirectToFn;
    ctrl.logout = logoutFn;

    function redirectToFn(path) {
      $location.path(path);
    }

    function logoutFn() {
      authFactory.logout();
      redirectToFn('/');
    }
  }]);
