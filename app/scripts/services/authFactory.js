/**
 * Created by Caim03 on 24/11/17.
 */

'use strict';

/**
 * authFactory espone le principali funzionalità in grado di:
 *  - permettere il login degli utenti;
 *  - permettere la registrazione degli utenti;
 *  - gestire i cookie
 */

angular.module('clientApp')
  .factory('authFactory', function ($cookies, $http, userFactory,backendFactory) {
    var authFactory = {};

    authFactory.login = loginFn;
    authFactory.logout = logoutFn;
    authFactory.signup = signupFn;

    function loginFn(data, callback) {
      $http.post('http://' + backendFactory.getIpAddress() + ':' + backendFactory.getPort() + backendFactory.getApiLogin(), data)
        .then(function(response){
          if(response.data.type === "LOGIN_SUCCESS") {
            var cookie = $cookies.get('userCookie');
            var user = {
              username: data.username
            };
            $cookies.putObject('userCookie', user);
            userFactory.setUsername(data.username);
            callback(true);
          }
          else {
            callback(false);
          }
        })
        .catch(function(error){
          console.log(error);
          callback(false);
        });
    }

    function logoutFn() {
      $cookies.remove('userCookie');
      userFactory.setUsername(null);
    }

    function signupFn(data, callback) {
      $http.post('http://' + backendFactory.getIpAddress() + ':' + backendFactory.getPort() + backendFactory.getApiRegistration(), data)
        .then(function(response) {
          if(response.data.type === "REGISTRATION_SUCCESS") {
            callback(true);
          }
          else {
            callback(false);
          }
        })
        .catch(function(error) {
          console.log(error);
          callback(false);
        })
    }

    return authFactory;
  });
