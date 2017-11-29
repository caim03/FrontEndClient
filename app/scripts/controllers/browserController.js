'use strict';

angular.module('clientApp')
  .controller('BrowserCtrl', ['$scope', '$rootScope', '$compile', '$http', '$location', '$cookies', 'userFactory', 'backendFactory', function ($scope, $rootScope, $compile, $http, $location, $cookies, userFactory, backendFactory) {
    var ctrl = this;
    ctrl.fileName = "";

    var pathElem = document.getElementById("path");
    var h4Text = document.getElementById("fileTitle");
    var pText = document.getElementById("fileText");
    var form = document.getElementById('form');

    ctrl.addNavbar = addNavbarFn;
    ctrl.openFile = openFileFn;
    ctrl.handleClick = handleClickFn;

    $scope.uploadFile = uploadFileFn;

    ctrl.categories = getDirectoryTree(userFactory.getUsername());

    function getDirectoryTree(user) {
      if (user === null || user === "" || user === undefined) {
        var user = $cookies.get('userCookie');

        if (user === null || user === "" || user === undefined) {
          $location.path('/');
        }
      }

      var data = {
        username: user
      };

      $http.post('http://' + backendFactory.getIpAddress() + ':' + backendFactory.getPort() + backendFactory.getApiDirectory(), data)
        .then(function (response) {
          console.log(response);
          return response.body
        })
        .catch(function (err) {
          console.log(err);
          $location.path('/404');
        });
    }

    function addNavbarFn(fileName) {
      pathElem.innerHTML = fileName;
    }

    function handleClickFn(event) {
      if (event.which === 3) {
        console.log("TASTO DESTRO");
      }
    }

    function openFileFn(file) {
      // TODO request file to master

       var config = {
         headers: {
         'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
         }
       };

       var metadata = {
         type: 'METADATA',
         name: file.name,
         size: file.size,
         fileType: file.fileType,
         user: 'username',
         guid: null
       };

      /* **********************************************************

      $http.post('indirizzo master', metadata, config)
        .success(function(data, status, headers, config){
          console.log(data);
          // contatto uno slave
          $http.post(data.slaves[0], metadata, config)
            .success(function(data, status, header, config){
              console.log(data); // file fisico

              h4Text.innerHTML = file.name;
              pText.innerHTML = data.text;
            })
            .error(function(data, status, header, config){
              console.log(data);
            });
        })
        .error(function(data, status, header, config){
          console.log(data, status);
          h4Text.innerHTML = status;
        });

       ********************************************************** */
    }

    function uploadFileFn(files) {
      // TODO request upload to master
      // TODO verificare la libreria fs (fs.createReadStream(path assoluto macchina))
      var file = files.files[0];
      console.log(file);

      var config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
      };

      var metadata = {
        type: 'METADATA',
        name: file.name,
        size: file.size,
        fileType: file.type
      };

      /* ******************************************

      $http.post('indirizzo master', metadata, config)
        .success(function(data, status, headers, config){
          console.log(data);
          // Invia il file fisico ad ogni slave
        })
        .error(function(data, status, headers, config){
          console.log(data);
        });

      ******************************************  */

      Materialize.toast('Upload Completed', 4000);
      form.reset();
    }

  }]);

