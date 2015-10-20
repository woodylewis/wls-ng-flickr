'use strict';

angular.module('getphoto.modal', [])
.directive('flickrModal', function() {
	return {
		restrict: 'EA',
		scope: {
			show: '='
		},
		replace: true,
		transclude: true,
		link: function(scope, element, attrs) {
			scope.dialogStyle = {};
			if(attrs.width) {
				scope.dialogStyle.width = attrs.width;
			}
			if(attrs.height) {
				scope.dialogStyle.height = attrs.height;
			}
			
			scope.hideModal = function() {
				scope.show = false;
			};
		},
		templateUrl: 'templates/modal.html'
	};

});