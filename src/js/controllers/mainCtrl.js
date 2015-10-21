'use strict';

angular
.module('getphoto.mainCtrl', [ 
  'getphoto.photoEngine',
  'getphoto.modal'
])
.controller('MainCtrl', MainCtrl);

function MainCtrl($scope, $state, PhotoEngine) {
  var vm = this;
  vm.photos = [];
  vm.page = [];
  vm.pageIndex = 0;
  vm.pageCount = 10;
  vm.currentPhoto = {};
  vm.showModal = false;
  vm.pe = new PhotoEngine();
  vm.pe.fetchPhotos()
  .then(function(data){
    parseFlickrResponse(data);
  })
  .then(function() {
    vm.init();
  });

  vm.init = function() {
    for(var i = vm.pageIndex; i < (vm.pageIndex + 10); i++) {
      vm.page.push(vm.photos[i]);
    }
    vm.pageIndex += vm.pageCount;
      console.log('init index', vm.pageIndex);
  };

  vm.photoPage = function(direction) {
    if (direction === 'forward') {
      vm.pageIndex += vm.pageCount;
      if (vm.pageIndex >= vm.photos.length) {
        vm.pageIndex = 0;
        vm.init();
      }
      else {
        for(var i = vm.pageIndex; i < (vm.pageIndex + 10); i++) {
          vm.page.push(vm.photos[i]);
        }
      }
    }
    else if (direction === 'back') {
      vm.pageIndex -= vm.pageCount;
      if(vm.pageIndex <= 0) {
        vm.pageIndex = 0;
        vm.init();
      }
      else {
        for(var j = vm.pageIndex; j < (vm.pageIndex + 10); j++) {
          vm.page.push(vm.photos[j]);
        }
      }
    }   
    console.log(vm.pageIndex);
  };
  
  vm.changePage = function(direction) {
    vm.page = [];
    vm.photoPage(direction);
  };

  vm.toggleModal = function(photo) {
    vm.showModal = !vm.showModal;
    vm.currentPhoto = photo;
  };

  function parseFlickrResponse(response) {
    var prefix = "jsonFlickrApi({",
        suffix = '},"stat":"ok"})',
        str1 = "photos",
        str2 = "id",
        pos1 = response.indexOf(str1),
        pos2 = pos1 + str1.length,
        header = response.substring(pos1, response.indexOf(str2)),
        remainder = response.substring(prefix.length + (header.length - 2), response.indexOf(suffix));

        vm.photos = angular.fromJson(remainder);
        for(var i = 0; i < vm.photos.length; i++) {
          vm.photos[i].thumb = 'https://farm' + vm.photos[i].farm + '.staticflickr.com/' + vm.photos[i].server + '/' + vm.photos[i].id + '_' + vm.photos[i].secret + '_s.jpg';
          vm.photos[i].medium = 'https://farm' + vm.photos[i].farm + '.staticflickr.com/' + vm.photos[i].server + '/' + vm.photos[i].id + '_' + vm.photos[i].secret + '_z.jpg';
        }
  }
}