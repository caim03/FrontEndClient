/**
 * Created by Caim03 on 18/12/17.
 */

'use strict';

/**
 * File di configurazione
 */

angular.module('clientApp')
  .constant('APP_CONFIGURATION', {
    backendAddress: "18.195.44.2",
    backendPort: "9001",
    getDirectory: "/api/backend/getDirectory",
    getFile: "/api/backend/getFile",
    uploadFile: "/api/backend/uploadFile",
    deleteFile: "/api/backend/deleteFile",
    login: "/api/backend/login",
    registration: "/api/backend/registration"
  });
