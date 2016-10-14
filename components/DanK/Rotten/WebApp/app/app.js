/// <reference path="../Scripts/jquery.js" />
/// <reference path="../Scripts/angular.js" />

var app = angular.module("rottenTomatoes", ["ngRoute", "ngTouch", "controllers", "services"]);

var controllers = angular.module("controllers", []);
var services = angular.module("services", []);

app.config(["$routeProvider", "$httpProvider", function ($routeProvider, $httpProvider) {

	$routeProvider.
	when("/list", {
		templateUrl: "views/list/list.html",
		controller: "listCtrl"
	}).
	when("/details/:movieId", {
		templateUrl: "views/details/details.html",
		controller: "detailsCtrl"
	})

	$httpProvider.interceptors.push('dkHttpInterceptor');
}]);


//document ready
$(function () {

	function centerLoader() {
		$("#ajaxLoader").css("left", (window.innerWidth / 2 - 20) + "px");
		$("#ajaxLoader").css("top", (window.innerHeight / 2 - 20) + "px");
	}

	$(window).resize(centerLoader);
	centerLoader();
})


