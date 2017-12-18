/**
 * Created by Caim03 on 24/11/17.
 */

'use strict';

angular.module('clientApp')
  .factory('backendFactory', function(APP_CONFIGURATION) {
    var backendFactory = {};

    backendFactory.ipAddress = APP_CONFIGURATION.backendAddress;
    backendFactory.port = APP_CONFIGURATION.backendPort;
    backendFactory.getDirectory = APP_CONFIGURATION.getDirectory;
    backendFactory.getFile = APP_CONFIGURATION.getFile;
    backendFactory.uploadFile = APP_CONFIGURATION.uploadFile;
    backendFactory.deleteFile = APP_CONFIGURATION.deleteFile;
    backendFactory.login = APP_CONFIGURATION.login;
    backendFactory.registration = APP_CONFIGURATION.registration;

    backendFactory.getIpAddress = getIpAddressFn;
    backendFactory.getPort = getPortFn;
    backendFactory.getApiDirectory = getApiDirectoryFn;
    backendFactory.getApiFile = getApiFileFn;
    backendFactory.getApiUpload = getApiUploadFn;
    backendFactory.getApiDelete = getApiDeleteFn;
    backendFactory.getApiLogin = getApiLoginFn;
    backendFactory.getApiRegistration = getApiRegistrationFn;

    function getIpAddressFn() {
      return backendFactory.ipAddress;
    }

    function getPortFn() {
      return backendFactory.port;
    }

    function getApiDirectoryFn() {
      return backendFactory.getDirectory;
    }

    function getApiFileFn() {
      return backendFactory.getFile;
    }

    function getApiUploadFn() {
      return backendFactory.uploadFile;
    }

    function getApiDeleteFn() {
      return backendFactory.deleteFile;
    }

    function getApiLoginFn() {
      return backendFactory.login;
    }

    function getApiRegistrationFn() {
      return backendFactory.registration;
    }

    return backendFactory;
  });
