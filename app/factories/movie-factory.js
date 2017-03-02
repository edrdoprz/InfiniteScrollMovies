angular.module('MoviePosterApp')
  .factory('Movie', function () {
    function Movie(title, posterUrl) {
      this.title = title;
      this.posterUrl = posterUrl;
    }

    return Movie;
  });