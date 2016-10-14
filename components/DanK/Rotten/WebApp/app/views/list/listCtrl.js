/// <reference path="../Scripts/angular.js" />

controllers.controller("listCtrl", ["$scope", "$location", "$timeout", "rottenServ", function ($scope, $location, $timeout, rottenServ) {

	// handle first time in, and also the first fires of watch expressions. Can't just set this true here and false at end, cause the 
	// watch expressions won't see the true value, as it's set to false at the end of this block. 
	// If we set a timeout though, then they see true and after they run, it's set to false.
	var init = true;
	$timeout(function () {
		init = false;
	}, 500);

	$scope.movies = [];

	$scope.paging = {
		total: 0,
		numPages: 0,
		numLinks: 5,
		selectPage: function (page) {
			$scope.page.currentPage = page;

			rottenServ.getPage($scope.page.searchText, page, $scope.page.pageSize).then(function (data) {
				if (data.total == undefined || data.total == 0) {
					$("#noRecords").show();
					$("#movieList").hide()
				}
				else {
					$("#noRecords").hide();
					$("#movieList").show();
					// rotten tomatoes limits you to 25 pages only (really?), when you go beyond 25 you get the message: error: "The value for page must be at most 25"
					// proof: http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=afa5umagkvvpmwm6bwywx4ge&callback=angular.callbacks._p&page=26&page_limit=5&q=star
					$scope.paging.total = data.total;
					var pages = Math.ceil(data.total / $scope.page.pageSize);
					//$scope.paging.numPages = pages > 25 ? 25 : pages; // realistically should be doing this with their 25 page cutoff
					$scope.paging.numPages = pages;
					$scope.paging.total = data.total;
					$scope.movies = data.movies;
				}
			});
		}
	};

	$scope.showDetails = function (movie) {
		$location.path("/details/" + movie.id)
	};

	$scope.$watch("page.pageSize", function () {
		if (!init) {
			$scope.paging.selectPage(1);
			$scope.$broadcast("pagination_init");
		}
	})

	$scope.$watch("page.search", function (val) {
		if (!init && val == true) {
			$scope.paging.selectPage(1);
			$scope.$broadcast("pagination_init");
		}
		$scope.page.search = false; // we need this outside the block to set it to false first time though
	});

	$scope.swipeRight = function () {
		if ($scope.page.currentPage > 1)
			$scope.$broadcast("pagination_prevPage");
	};

	$scope.swipeLeft = function () {
		if ($scope.page.currentPage < $scope.paging.numPages) {
			$scope.$broadcast("pagination_nextPage");
		}
	};
	
	// initialize the first page
	$scope.paging.selectPage($scope.page.currentPage);
}]);


