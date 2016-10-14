/// <reference path="../Scripts/angular.js" />

controllers.controller("detailsCtrl", ["$scope", "$location", "$routeParams", "rottenServ", function ($scope, $location, $routeParams, rottenServ) {

	$scope.back = function () {
		$location.path("/list");
	};

	// init
	rottenServ.getOne($routeParams.movieId).then(function (data) {
		$scope.movie = data;
	});

}]);


