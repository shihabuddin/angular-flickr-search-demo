app.factory('flickr', ['$http', function ($http) {
  var restUrl = 'https://api.flickr.com/services/rest/';
  var apiKey = '5fb5b14bb0f5ef69ce155577c1f46a6c';
  return {
    search: function (tags) {
      var url = restUrl + '?method=flickr.photos.search&api_key=' + apiKey + '&tags=' + tags + '&format=json&nojsoncallback=1';
      return $http.get(url).then(function (response) {
        return response.data.photos.photo;
      });
    },
    thumbnail: function (photoId) {
      var url = restUrl + '?method=flickr.photos.getSizes&api_key=' + apiKey + '&photo_id=' + photoId + '&format=json&nojsoncallback=1';
      return $http.get(url).then(function (response) {
        return response.data.sizes.size[2];
      });
    }
  };
}]);
