'use strict';

angular.module('clientApp')
  .controller('SignupCtrl', ['$scope', '$rootScope', '$compile', '$http', '$location', 'authFactory', function ($scope, $rootScope, $compile, $http, $location, authFactory) {
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

      var data = {
        username: ctrl.username,
        password: ctrl.password
      };

      authFactory.signup(data, function (result) {
        if(result === true) {
          Materialize.toast('Welcome ' + ctrl.username + ', perform the access to login the page!', 3000);
          $location.path('/');
        }
        else {
          console.log("Signup Error");
          Materialize.toast('There was an error in signup...please try again!', 3000);
          $location.path('/');
        }
      });
    }
  }]);
