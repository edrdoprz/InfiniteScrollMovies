describe('MainController', function () {
  beforeEach(module('MoviePosterApp'));

  beforeEach(inject(function ($controller, $rootScope, $httpBackend, $timeout, $q, MovieService, Movie) {
    this.$q = $q;
    this.$rootScope = $rootScope;
    this.$timeout = $timeout;
    this.$httpBackend = $httpBackend;

    this.MovieService = MovieService;
    this.Movie = Movie;
  }));

  describe('getMoviePage, delay, timeout', function () {
    var newPromise;
    beforeEach(function () {
      this.$httpBackend
        .when('GET')
        .respond(200, { resp: { data: { results: [{ poster_path: '', original_title: '' }]}} });

      newPromise = this.MovieService.getMoviePage(1, true);

      this.$httpBackend.flush();
      this.$rootScope.$apply();
      this.$timeout.flush();
    });

    it('should resolve', function () {
      newPromise.then(function (data) {
        expect(data.length).toBe(1);
      });
    });
  });

  describe('getMoviePage, delay, no timeout', function () {
    var newPromise;
    beforeEach(function () {
      this.$httpBackend
        .when('GET')
        .respond(200, { resp: { data: { results: [{ poster_path: '', original_title: '' }]}} });

      newPromise = this.MovieService.getMoviePage(1, false);

      this.$httpBackend.flush();
      this.$rootScope.$apply();
      this.$timeout.flush();
    });

    it('should resolve', function () {
      newPromise.then(function (data) {
        expect(data.length).toBe(1);
      });
    });
  });

  describe('getMoviePage, reject', function () {
    var newPromise;
    beforeEach(function () {
      this.$httpBackend
        .when('GET')
        .respond(400, 'bad');

      newPromise = this.MovieService.getMoviePage(1, true);

      this.$httpBackend.flush();
      this.$rootScope.$apply();
      this.$timeout.flush();
    });

    it('should reject', function () {
      newPromise.catch(function (message) {
        expect(message).toBe('bad');
      });
    });
  });
});
