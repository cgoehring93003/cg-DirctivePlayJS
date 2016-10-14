/// <reference path="../../Scripts/angular.js" />

services.factory("rottenServ", ["$http", "$q", function ($http, $q) {

	var APIKEY = "afa5umagkvvpmwm6bwywx4ge"
	
	getPage = function (searchText, page, pageSize) {

		var url = "http://api.rottentomatoes.com/api/public/v1.0/movies.json",

		params = {
			callback: "JSON_CALLBACK",
			apikey: APIKEY,
			q: encodeURIComponent(searchText.trim()),
			page_limit: pageSize,
			page: page
		},

		def = $q.defer();

		$http.jsonp(url, { params: params }).success(function (data) {
			def.resolve(data);
			}).error(function (data, status) {
			def.reject(status);
		});

		return def.promise;
	},


	getOne = function (id) {

		var url = "http://api.rottentomatoes.com/api/public/v1.0/movies/" + id + ".json",
		params = {
			callback: "JSON_CALLBACK",
			apikey: APIKEY
		},
		def = $q.defer();

		$http.jsonp(url, { params: params }).success(function (data) {
			def.resolve(data);
		}).error(function (data, status) {
			def.reject(status);
		});

		return def.promise;
	};


	return {
		getPage: getPage,
		getOne: getOne
	};

}]);

