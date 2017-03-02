'use strict';

angular.module('MoviePosterApp')
  .controller('MainController', ['$scope', '$timeout', 'MovieService', function ($scope, $timeout, MovieService) {
    $scope.currentPage = 1;
    $scope.movies = [];
    $scope.loadingNextPage = false;
    $scope.isInfiniteScrollingEnabled = false;
    $scope.errorMessage = '';

    $scope.nextPage = function () {
      if (!$scope.isInfiniteScrollingEnabled) return;

      $scope.isInfiniteScrollingEnabled = false;
      $scope.loadingNextPage = true;
      $scope.currentPage += 1;

      MovieService.getMoviePage($scope.currentPage, true).then(function(movies) {
        $scope.errorMessage = '';
        $scope.isInfiniteScrollingEnabled = true;
        $scope.loadingNextPage = false;
        $scope.movies = $scope.movies.concat(movies);
      }).catch(function (err) {
        $scope.isInfiniteScrollingEnabled = true;
        $scope.currentPage -= 1;
        $scope.errorMessage = 'Error has occured fetching next page. Please scroll down to try again.';
      });
    };
    
    $scope.startup = function () {
      MovieService.getMoviePage($scope.currentPage).then(function(movies) {
        $scope.movies = movies;

        $timeout(function () {
          $scope.isInfiniteScrollingEnabled = true;
        }, 250);
      }).catch(function (err) {
        $scope.errorMessage = 'Error has occured fetching next page. Please refresh down to try again.';
      });
    };
    $scope.startup();
  }]);