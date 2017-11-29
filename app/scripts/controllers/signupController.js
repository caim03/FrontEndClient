'use strict';

angular.module('clientApp')
  .controller('SignupCtrl', ['$scope', '$rootScope', '$compile', '$http', '$location', function ($scope, $rootScope, $compile, $http, $location) {
    var ctrl = this;

    ctrl.username = "";
    ctrl.password = "";
    ctrl.confPassword = "";
    ctrl.invalid = false;

    ctrl.signUp = signUpFn;

    function signUpFn() {
      if (ctrl.username === "" || ctrl.username === undefined || ctrl.username === null) {
        console.log("Invalid username");
        ctrl.invalid = true;
        return;
      }

      if (ctrl.password === "" || ctrl.password === undefined || ctrl.password === null) {
        console.log("Invalid password");
        ctrl.invalid = true;
        return;
      }

      if (ctrl.confPassword !== ctrl.password) {
        console.log("Password doesn't match");
        ctrl.invalid = true;
        return;
      }

      console.log("Signup successful");

      // TODO create user on cloud

      Materialize.toast('Welcome ' + ctrl.username + ', perform the access to login the page!', 3000);
      $location.path('/');
    }
  }]);
