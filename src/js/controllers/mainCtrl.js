'use strict';

angular
.module('getphoto.mainCtrl', [ 
  'getphoto.photoEngine'
])
.controller('MainCtrl', MainCtrl);

function MainCtrl($scope, $state, PhotoEngine) {
  var vm = this;
  vm.photos = [];
  vm.pe = new PhotoEngine();
  vm.pe.fetchPhotos()
  .then(function(data){
    parseFlickrResponse(data);
  });

  function parseFlickrResponse(response) {
    var prefix = "jsonFlickrApi({",
        suffix = '},"stat":"ok"})',
        str1 = "photos",
        str2 = "id",
        pos1 = response.indexOf(str1),
        pos2 = pos1 + str1.length,
        header = response.substring(pos1, response.indexOf(str2)),
        remainder = response.substring(prefix.length + (header.length - 2), response.indexOf(suffix)),
        theJson = angular.fromJson(remainder);
        vm.photos = angular.fromJson(remainder);

        for(var i = 0; i < theJson.length; i++) {
          console.log(theJson[i]);
        }
  }

  $state.go('main');
}