'use strict';

angular.module('getphoto.photoEngine', [])
.factory('PhotoEngine', ['$q', '$http', function($q, $http) {

  var PhotoEngine = function() {
    this.photos = [];
    this.busy = false;
    this.photoUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&tags=soccer&api_key=7ba903e29a59a29844142971965efd6f&format=json';
  };

  PhotoEngine.prototype.fetchPhotos = function() {
      var deferred = $q.defer();
      $http.get(this.photoUrl)
      .success( function(data) {
        deferred.resolve(data);
      })
      .error(function(reason) {
        deferred.reject(reason);
      });
      return deferred.promise;
  };

  return PhotoEngine;
}]);