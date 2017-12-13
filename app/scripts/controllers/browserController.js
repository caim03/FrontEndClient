'use strict';

angular.module('clientApp')
  .controller('BrowserCtrl', ['$scope', '$rootScope', '$compile', '$http', '$location', '$cookies', 'userFactory', 'backendFactory', 'Upload', function ($scope, $rootScope, $compile, $http, $location, $cookies, userFactory, backendFactory, Upload) {
    var ctrl = this;

    var pathElem = document.getElementById("path");
    var currPath = "";
    var currCat = null;

    ctrl.addNavbar = addNavbarFn;
    ctrl.openFile = openFileFn;
    ctrl.handleClick = handleClickFn;
    ctrl.delete = deleteFn;
    ctrl.openInput = openInputFn;
    ctrl.closeInput = closeInputFn;
    ctrl.createFolder = createFolderFn;

    ctrl.fileName = "";
    ctrl.fileTitle = "";
    ctrl.fileText = "";
    ctrl.newFolder = false;
    ctrl.newFolderName = "";

    $scope.uploadFile = uploadFileFn;

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
        currCat = cat;
        pathElem.innerHTML = currPath;
        console.log(currPath);
      }

      if (event.which === 1) {
        console.log("TASTO SINISTRO");

        currPath = cat.path;
        currCat = cat;
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
          console.log(file);
          ctrl.fileTitle = file.name;
          ctrl.fileText = response.data;

          /*
          if(file.extension.match('jpg|png')){
            ctrl.image = response.data;
          }
          else if(file.extension.match('pdf')){
            console.log("Not supported for now!");
          }
          else{
            ctrl.fileText = response.data;
          }
          */
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

    function openInputFn() {
      ctrl.newFolder = true;
    }

    function closeInputFn() {
      ctrl.newFolder = false;
    }

    function createFolderFn($event) {
      if ($event.which === 13 || $event.keyCode === 13) {
        var child = {
          folder: true,
          path: currPath + '/' + ctrl.newFolderName,
          name: ctrl.newFolderName,
          children: []
        };

        currCat.children.push(child);
        closeInputFn();
      }
    }
  }]);

