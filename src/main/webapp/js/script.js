var app = angular.module('FlickrSearch', []);
app.controller('Main', ['$scope', '$http', function ($scope, $http) {
  var loadPhotos = function (url) {
    $http.get(url).then(function (response) {
      var photos = $scope.photos = response.data.photos.photo;
      for (var i = 0; i < photos.length; i++) {
        loadPhoto(photos[i]);
      }
    });
  };
  var loadPhoto = function (photo) {
    var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=' + apiKey + '&photo_id=' + photo.id + '&format=json&nojsoncallback=1';
    $http.get(url).then(function (response) {
      photo.thumbnail = response.data.sizes.size[2];
    });
  };

  var apiKey = '5fb5b14bb0f5ef69ce155577c1f46a6c';
  var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&tags=bangladesh&format=json&nojsoncallback=1';
  loadPhotos(url);
}]);
