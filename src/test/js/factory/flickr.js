describe('factory: flickr', function () {
  var flickr, $http, $httpBackend;

  beforeEach(module('FlickrSearch'));
  beforeEach(inject(function (_flickr_, _$http_, _$httpBackend_) {
    flickr = _flickr_;
    $http = _$http_;
    $httpBackend = _$httpBackend_;
  }));

  it('search for bangladesh invokes get request to correct url', function () {
    var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=5fb5b14bb0f5ef69ce155577c1f46a6c&tags=bangladesh&format=json&nojsoncallback=1';
    $httpBackend.expectGET(url);
    $httpBackend.whenGET(url).respond({photos: {photo: []}});
    flickr.search('bangladesh');
    $httpBackend.flush();
  });
});
