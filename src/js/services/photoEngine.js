'use strict';

angular.module('getphoto.photoEngine', [])
.factory('PhotoEngine', ['$q', '$http', function($q, $http) {

  var PhotoEngine = function() {
    this.photos = [];
    this.busy = false;
    this.id = 'n';
    this.photoUrl = 'http://getphoto.net:7100/photos/';
    this.photoPageUrl = 'http://getphoto.net:7100/photo-page/';
    this.photoReferralUrl = 'http://getphoto.net:7100/photo/';
  };

  PhotoEngine.prototype.nextPhotos = function() {
    if(this.busy) return;
    this.busy = true;

    this.fetchPhotoPage(this.id)
    .then(function (photos) {
      for(var i=0; i < photos.length; i++) {
        this.photos.push(photos[i]);
      }
      this.busy = false;
      this.id = photos[photos.length - 1]._id;
    }.bind(this));
  };

  PhotoEngine.prototype.fetchPhotoPage = function(id) {
      var deferred = $q.defer();
      $http.get(this.photoPageUrl + id)
      .success( function(data) {
        deferred.resolve(data);
      })
      .error(function(reason) {
        deferred.reject(reason);
      });
      return deferred.promise;
  };
  PhotoEngine.prototype.fetchCurrentPhoto = function(id) {
      var deferred = $q.defer();
      $http.get(this.photoUrl + id)
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(reason) {
        deferred.reject(reason);
      });
      return deferred.promise;
  };
  return PhotoEngine;
}]);