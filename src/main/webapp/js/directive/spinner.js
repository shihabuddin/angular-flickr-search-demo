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
