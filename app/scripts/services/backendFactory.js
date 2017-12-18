/**
 * Created by Caim03 on 24/11/17.
 */

'use strict';

angular.module('clientApp')
  .factory('backendFactory', function() {
    var backendFactory = {};

    backendFactory.ipAddress = "54.208.204.184";
    backendFactory.port = "9001";
    backendFactory.getDirectory = "/api/backend/getDirectory";
    backendFactory.getFile = "/api/backend/getFile";
    backendFactory.uploadFile = "/api/backend/uploadFile";
    backendFactory.deleteFile = "/api/backend/deleteFile";
    backendFactory.login = "/api/backend/login";
    backendFactory.registration = "/api/backend/registration";

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
