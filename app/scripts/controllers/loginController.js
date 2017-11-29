'use strict';

angular.module('clientApp')
  .controller('LoginCtrl', ['$scope', '$rootScope', '$compile', '$http', '$location', '$cookies', 'userFactory', 'authFactory', function ($scope, $rootScope, $compile, $http, $location, $cookies, userFactory, authFactory) {
    var ctrl = this;

    ctrl.username = "";
    ctrl.password = "";
    ctrl.invalid = false;

    ctrl.login = loginFn;

    function loginFn() {
      if (ctrl.username === undefined || ctrl.username === null || ctrl.username === "" ) {
        console.log("Invalid username");
        ctrl.invalid = true;
        return;
      }

      if (ctrl.password === undefined || ctrl.password === null || ctrl.password === "") {
        console.log("Invalid password");
        ctrl.invalid = true;
        return;
      }

      var user = {
        'username': ctrl.username,
        'password': ctrl.password
      };

      authFactory.login(user, function(result) {
        if (result === true) {
          console.log("Login successful");
          $location.path('/browser');
        }
        else {
          console.log("Login error");
          ctrl.invalid = true;
        }
      });
    }
  }]);
