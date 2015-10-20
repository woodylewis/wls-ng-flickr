'use strict';

angular
.module('getphoto.mainCtrl', [
  'infinite-scroll',
  'getphoto.narrationEngine'
])
.controller('MainCtrl', MainCtrl);

function MainCtrl($scope, $state, $filter, $location, $sce, NarrationEngine) {
  var vm = this;
  vm.ne = new NarrationEngine();
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

  vm.fetchNarration = function(theID) {
    var filtered = $filter('filter')(vm.ne.narrations, {_id: theID});
    vm.cn = filtered[0];
    vm.markup = $sce.trustAsHtml(vm.cn.body);
    vm.click = true;
    $location.url('/narration/' + vm.cn.url);
  };

  vm.fetchUrl = function(args) {
    console.log('fetchUrl ', args);
    vm.ne.fetchCurrentNarration(args)
    .then(function (data) {
      console.log('NARRATION ', data);
    });
  };
}