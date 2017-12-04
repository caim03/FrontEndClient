/**
 * Created by Caim03 on 24/11/17.
 */

'use strict';

angular.module('clientApp')
  .factory('backendFactory', function() {
    var backendFactory = {};

    backendFactory.ipAddress = "localhost";
    backendFactory.port = "9001";
    backendFactory.getDirectory = "/api/backend/getDirectory";
    backendFactory.getFile = "/api/backend/getFile";
    backendFactory.uploadFile = "/api/backend/uploadFile";

    backendFactory.getIpAddress = getIpAddressFn;
    backendFactory.getPort = getPortFn;
    backendFactory.getApiDirectory = getApiDirectoryFn;
    backendFactory.getApiFile = getApiFileFn;
    backendFactory.getApiUpload = getApiUploadFn;

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

    return backendFactory;
  });
