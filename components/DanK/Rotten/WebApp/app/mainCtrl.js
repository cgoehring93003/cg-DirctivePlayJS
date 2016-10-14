/// <reference path="../Scripts/angular.js" />

controllers.controller("mainCtrl", ["$scope", "$location", "rottenServ", function ($scope, $location, rottenServ) {

	$scope.page = {
		search:false,
		searchText: "",
		pageSize: 5,
		currentPage: 1
	};

	$scope.search = function () {
		$scope.page.currentPage = 1;// set for first time in
		$scope.page.search = true; // trigger search when already on "list" page
		$location.path("/list");
	};


}]);


