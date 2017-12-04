'use strict';

angular.module('clientApp')
  .controller('BrowserCtrl', ['$scope', '$rootScope', '$compile', '$http', '$location', '$cookies', 'userFactory', 'backendFactory', 'Upload', function ($scope, $rootScope, $compile, $http, $location, $cookies, userFactory, backendFactory, Upload) {
    var ctrl = this;
    ctrl.fileName = "";

    var pathElem = document.getElementById("path");
    var h4Text = document.getElementById("fileTitle");
    var pText = document.getElementById("fileText");

    var currPath = "";

    ctrl.addNavbar = addNavbarFn;
    ctrl.openFile = openFileFn;
    ctrl.handleClick = handleClickFn;

    $scope.uploadFile = uploadFileFn;

    ctrl.categories = [];

    getDirectoryTree(userFactory.getUsername());

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
          ctrl.categories = response.data;
        })
        .catch(function (err) {
          console.log(err);
          $location.path('/404');
        });
    }

    function addNavbarFn(fileName) {
      pathElem.innerHTML = fileName;
    }

    function handleClickFn(event, cat) {
      if (event.which === 3) {
        console.log("TASTO DESTRO");
      }

      if (event.which === 1) {
        console.log("TASTO SINISTRO");
        console.log(cat);
        if (cat.children) {
          currPath = currPath + '/' + cat.name;
        }
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
         user: userFactory.getUsername(),
         guid: null
       };

      $http.post('http://' + backendFactory.getIpAddress() + ':' + backendFactory.getPort() + backendFactory.getApiFile(), metadata, config)
        .then(function(response) {
          h4Text.innerHTML = file.name;
          pText.innerHTML = response.data; // TODO vedere come accedere al corpo del file
        })
        .catch(function(err) {
          console.log(err);
          $location.path('/404');
        });
    }

    function uploadFileFn(files) {
      var file = files.files[0];

      Upload.upload({
        url: 'http://' + backendFactory.getIpAddress() + ':' + backendFactory.getPort() + backendFactory.getApiUpload(),
        data: {
          file: file,
          username: userFactory.getUsername(),
          path: currPath
        }
      }).then(function(response){
        console.log(response);
        console.log('Upload success!');

        if (response.status === 200) {
          Materialize.toast('Upload Completed', 4000);

          /* Update tree */
          getDirectoryTree(userFactory.getUsername());
        }
      });
    }
  }]);

