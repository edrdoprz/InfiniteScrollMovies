'use strict';

angular.module('MoviePosterApp')
  .service('MovieService', ['$http', '$q', '$timeout', 'Movie', function ($http, $q, $timeout, Movie) {
    var API_KEY = 'xxxxxxxAPI-KEY-HERExxxxxxxxxx';
    var BASE_URL = 'https://api.themoviedb.org/';
    var BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w342';

    this.getMoviePage = function (page = 1, addDelay = false) {
      var deferred = $q.defer();
      var url = BASE_URL + '3/movie/popular?api_key=' + API_KEY + '&language=en-US&page=' + page;

      $http({ method: 'GET', url: url }).then(function(resp) {
        var movies = transformMovies(resp.data.results);

        if (addDelay) {
          $timeout(function () {
            deferred.resolve(movies);
          }, 500);
        } else {
          deferred.resolve(movies);
        }
      }).catch(function (err) {
        deferred.reject(err);
      });

      return deferred.promise;
    };

    var transformMovies = function (movies) {
      if (movies && movies.length) {
        var newMovies = movies.map(function (movie) {
          let posterUrl = BASE_IMAGE_URL + movie.poster_path;
          let newMovie = new Movie(movie.original_title, posterUrl);

          return newMovie;
        });

        return newMovies;
      }
      
      return movies;
    };
  }]);