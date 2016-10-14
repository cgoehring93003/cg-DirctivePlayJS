
// Http interceptor for ajax loader on larger pages (sans some kind of caching mechanism which would be better)
app.factory('dkHttpInterceptor', ["$q", function ($q) {
	return {
		'request': function (config) {
			if (config.url.indexOf("http://api.rottentomatoes.com") != -1 && config.params.page_limit > 10)
				$("#ajaxLoader").show();
			return config || $q.when(config);
		},

		'response': function (response) {
			$("#ajaxLoader").hide();
			return response || $q.when(response);
		}
	};
}]);

