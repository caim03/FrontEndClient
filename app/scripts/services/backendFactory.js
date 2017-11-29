/**
 * Created by Caim03 on 24/11/17.
 */

'use strict';

angular.module('clientApp')
  .factory('backendFactory', function() {
    var backendFactory = {};

    backendFactory.ipAddress = "localhost";
    backendFactory.port = "9901";
    backendFactory.getDirectory = "/api/backend/getDirectory";

    backendFactory.getIpAddress = getIpAddressFn;
    backendFactory.getPort = getPortFn;
    backendFactory.getApiDirectory = getApiDirectoryFn;

    function getIpAddressFn() {
      return backendFactory.ipAddress;
    }

    function getPortFn() {
      return backendFactory.port;
    }

    function getApiDirectoryFn() {
      return backendFactory.getDirectory;
    }

    return backendFactory;
  });
