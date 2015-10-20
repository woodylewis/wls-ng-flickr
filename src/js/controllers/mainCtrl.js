'use strict';

angular
.module('getphoto.mainCtrl', [ 
  'getphoto.photoEngine'
])
.controller('MainCtrl', MainCtrl);

function MainCtrl($scope, $state, $filter, $location, $sce, PhotoEngine) {
  var vm = this;
  vm.ne = new PhotoEngine();
  vm.cn = {};
  vm.click = false;

  $scope.$on('referral', function(event, args) {
    if(vm.click === true) {
      vm.click = false;
    }
    else {
      vm.fetchUrl(args);
    }
  });

  $state.go('main');

  vm.fetchPhoto = function(theID) {
    var filtered = $filter('filter')(vm.ne.photos, {_id: theID});
    vm.cn = filtered[0];
    vm.markup = $sce.trustAsHtml(vm.cn.body);
    vm.click = true;
    $location.url('/photo/' + vm.cn.url);
  };

  vm.fetchUrl = function(args) {
    console.log('fetchUrl ', args);
    vm.ne.fetchCurrentPhoto(args)
    .then(function (data) {
      console.log('PHOTO ', data);
    });
  };
}