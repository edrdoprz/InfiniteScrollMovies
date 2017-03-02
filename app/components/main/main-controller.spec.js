describe('MainController', function () {
  beforeEach(module('MoviePosterApp'));

  var deferred;
  beforeEach(module(function ($provide) {
    $provide.service('MovieService', function () {
      this.getMoviePage = jasmine.createSpy('getMoviePage');
    });
  }));

  beforeEach(inject(function ($controller, $rootScope, $timeout, $httpBackend, $q, MovieService) {
    this.$q = $q;
    this.$rootScope = $rootScope;
    this.$scope = $rootScope.$new();
    this.$timeout = $timeout;
    this.$httpBackend = $httpBackend;
    this.MovieService = MovieService;

    this.MovieService.getMoviePage.and.callFake(function () { 
      deferred = $q.defer();
      return deferred.promise;
    });

    $controller('MainController', {
      $scope: this.$scope,
      $timeout: this.$timeout,
      MovieService: this.MovieService
    });
  }));

  describe('init', function () {
    it('should have called getMovie', function () {
      expect(this.MovieService.getMoviePage).toHaveBeenCalled();
    });
  });

  describe('startup, resolve', function () {
    beforeEach(function () {
      this.$scope.startup();
      deferred.resolve('movies');

      this.$rootScope.$apply();
    });

    it('should have called getMovie', function () {
      expect(this.MovieService.getMoviePage).toHaveBeenCalled();
    });

    it('should have set movies on resolve', function () {
      expect(this.$scope.movies).toBe('movies');
    });

    it('should leave inifite scroll disabled', function () {
      expect(this.$scope.isInfiniteScrollingEnabled).toBe(false);
    });
  });

  describe('startup, resolve, after timeout', function () {
    beforeEach(function () {
      this.$scope.startup();
      deferred.resolve('movies');

      this.$rootScope.$apply();
      this.$timeout.flush();
    });

    it('should enable infinite scrool', function () {
      expect(this.$scope.isInfiniteScrollingEnabled).toBe(true);
    });
  });

  describe('startup, reject', function () {
    beforeEach(function () {
      this.$scope.startup();
      deferred.reject();

      this.$rootScope.$apply();
    });

    it('should have called getMovie', function () {
      expect(this.MovieService.getMoviePage).toHaveBeenCalled();
    });

    it('should have set error message on reject', function () {
      expect(this.$scope.errorMessage).toBe('Error has occured fetching next page. Please refresh down to try again.');
    });
  });

  describe('nextPage', function () {
    beforeEach(function () {
      this.$scope.nextPage();
    });

    it('should not increase page number because infinite scroll is disabled', function () {
      expect(this.$scope.currentPage).toBe(1);
    });
  });

  describe('nextPage, enabled, resolve', function () {
    beforeEach(function () {
      this.$scope.movies = 'more ';
      this.$scope.isInfiniteScrollingEnabled = true;
      this.$scope.nextPage();
      deferred.resolve('movies');

      this.$rootScope.$apply();
    });

    it('should increase page number because infinite scroll is enabled', function () {
      expect(this.$scope.currentPage).toBe(2);
    });

    it('should have called getMovie', function () {
      expect(this.MovieService.getMoviePage).toHaveBeenCalledWith(2, true);
    });

    it('should have concat movies', function () {
      expect(this.$scope.movies).toBe('more movies');
    });
  });

  describe('nextPage, enabled, reject', function () {
    beforeEach(function () {
      this.$scope.movies = 'more ';
      this.$scope.isInfiniteScrollingEnabled = true;
      this.$scope.nextPage();
      deferred.reject();

      this.$rootScope.$apply();
    });

    it('should reset current page back to one because of rejection', function () {
      expect(this.$scope.currentPage).toBe(1);
    });

    it('should have called getMovie', function () {
      expect(this.MovieService.getMoviePage).toHaveBeenCalledWith(2, true);
    });

    it('should not have concat movies', function () {
      expect(this.$scope.movies).toBe('more ');
    });
  });
});
