var app = angular.module('FlickrSearch', []);
app.controller('Main', ['$scope', '$http', function ($scope, $http) {
  var loadPhotos = function (url) {
    $http.get(url).then(function (response) {
      $scope.photos = response.data.photos.photo;
    });
  };

  var apiKey = '5fb5b14bb0f5ef69ce155577c1f46a6c';
  var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&tags=bangladesh&format=json&nojsoncallback=1';
  loadPhotos(url);
}]);
