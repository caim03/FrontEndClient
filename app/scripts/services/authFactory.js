/**
 * Created by Caim03 on 24/11/17.
 */

'use strict';

angular.module('clientApp')
  .factory('authFactory', function ($cookies, userFactory) {
    var authFactory = {};

    authFactory.login = loginFn;
    authFactory.logout = logoutFn;

    function loginFn(data, callback) {
      // TODO search user on cloud

      var cookie = $cookies.get('userCookie');
      $cookies.putObject('userCookie', data.username);
      userFactory.setUsername(data.username);
      callback(true);

      // se non trovato callback(false)
    }

    function logoutFn() {
      $cookies.remove('userCookie');
      userFactory.setUsername(null);
    }

    return authFactory;
  });
