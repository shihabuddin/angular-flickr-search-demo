app.controller('Main', ['$scope', 'flickr', function ($scope, flickr) {
  var loadPhoto = function (photo) {
    flickr.thumbnail(photo.id).then(function (thumbnail) {
      photo.thumbnail = thumbnail;
    });
  };

  $scope.search = function(tags){
    flickr.search(tags).then(function (photos) {
      $scope.photos = photos;
      for (var i = 0; i < photos.length; i++) {
        loadPhoto(photos[i]);
      }
    });
  };
}]);
