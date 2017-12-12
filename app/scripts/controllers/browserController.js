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
    ctrl.delete = deleteFn;
    ctrl.fileTitle = "";
    ctrl.fileText = "";
    ctrl.image = "";

    $scope.uploadFile = uploadFileFn;

    ctrl.categories = [];

    getDirectoryTree(userFactory.getUsername());

    function getDirectoryTree(user) {
      if (user === null || user === "" || user === undefined) {
        var user = JSON.parse($cookies.get('userCookie')).username;
        console.log(user);

        if (user === null || user === "" || user === undefined) {
          $location.path('/');
        }
        else {
          userFactory.setUsername(user);
        }
      }

      currPath = user;

      var data = {
        username: user
      };

      $http.post('http://' + backendFactory.getIpAddress() + ':' + backendFactory.getPort() + backendFactory.getApiDirectory(), data)
        .then(function (response) {
          ctrl.categories = response.data;
          console.log(ctrl.categories);
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

        currPath = cat.path;
        console.log(currPath);
      }

      if (event.which === 1) {
        console.log("TASTO SINISTRO");

        currPath = cat.path;
        pathElem.innerHTML = currPath;
        console.log(currPath);
      }
    }

    function openFileFn(file) {

      var metadata = {
        user: userFactory.getUsername(),
        guid: file.guid,
        path: file.path
       };

      $http.post('http://' + backendFactory.getIpAddress() + ':' + backendFactory.getPort() + backendFactory.getApiFile(),
        metadata)
        .then(function(response) {
          ctrl.fileTitle = file.name;

          if(file.size.match('jpg|png')){
            ctrl.image = response.data;
          }
          else if(file.size.match('pdf')){
            console.log("Not supported for now!");
          }
          else{
            ctrl.fileText = response.data;
          }
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
          path: currPath + '/' + file.name
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

    function deleteFn() {
      var metadata = {
        idUser: userFactory.getUsername(),
        path: currPath
      };

      $http.post('http://' + backendFactory.getIpAddress() + ':' + backendFactory.getPort() + backendFactory.getApiDelete(), metadata)
        .then(function(response) {
          if(response.data.type === 'DELETE_SUCCESS') {
            Materialize.toast('Delete Completed', 4000);
            getDirectoryTree(userFactory.getUsername());
          }
          else {
            Materialize.toast('An error was occurred in file delete', 4000);
          }
        })
        .catch(function(error) {
          console.log(error);
        })
    }
  }]);

