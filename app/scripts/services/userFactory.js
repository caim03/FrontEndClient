'use strict';

/**
 * userFactory permette di tenere traccia dell'utente corrente all'interno dell'applicazione (usato insieme ai cookie)
 */

angular.module('clientApp')
  .factory('userFactory', function() {
    var userFactory = {};

    userFactory.username = null;
    userFactory.setUsername = setUsernameFn;
    userFactory.getUsername = getUsernameFn;

    function setUsernameFn(username) {
      if (username !== null && username !== "" || username !== undefined) {
        userFactory.username = username;
      }
      else {
        console.log("Bad username");
      }
    }

    function getUsernameFn() {
      return userFactory.username;
    }

    return userFactory;
  });
