var app = angular.module('FlickrSearch', []);

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

app.directive('spinner', ['$parse', function ($parse) {
  return {
    restrict: 'A',
    link: function ($scope, element, attributes) {
      if (element.prop('tagName') != 'IMG') {
        return;
      }
      var spinner = attributes.src;
      var load = function (url) {
        if (url) {
          element.attr('src', url);
        }
        else {
          element.attr('src', spinner);
        }
      };
      load($parse(attributes.spinner)($scope));
      $scope.$watch(attributes.spinner, load);
    }
  }
}]);

app.controller('Main', ['$scope', 'flickr', function ($scope, flickr) {
  var loadPhoto = function (photo) {
    flickr.thumbnail(photo.id).then(function (thumbnail) {
      photo.thumbnail = thumbnail;
    });
  };

  flickr.search('bangladesh').then(function (photos) {
    $scope.photos = photos;
    for (var i = 0; i < photos.length; i++) {
      loadPhoto(photos[i]);
    }
  });
}]);
