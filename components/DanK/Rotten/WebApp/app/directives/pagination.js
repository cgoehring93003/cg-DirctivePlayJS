

app.directive('pagination', function () {
	return {
		restrict: 'E',
		scope: {
			init: '=',
			numPages: '=',
			currentPage: '=',
			numLinks: '=',
			onSelectPage: '&'
		},
		template:
		'<div>' +
		'<ul class="pagination">' +
		'<li ng-class="{disabled: noPrevious()}"><a ng-click="selectPrevious()">&laquo;</a></li>' +
		'<li ng-repeat="page in pages" ng-class="{active: isActive(page)}"><a ng-click="selectPage(page)">{{page}}</a></li>' +
		'<li ng-class="{disabled: noNext()}"><a ng-click="selectNext()">&raquo;</a></li>' +
		'</ul>' +
		'</div>',
		replace: true,
		link: function (scope) {

			// private
			var firstTime = true;
			rangeMax = scope.numLinks,
			rangeStart = 1,
			rangeEnd = rangeMax,
			init = function () {
				scope.pages = [];
				rangeMax = scope.numLinks > scope.numPages ? scope.numPages : scope.numLinks;
				rangeEnd = rangeMax;
				for (var i = 1; i <= rangeMax; i++) {
					scope.pages.push(i);
				}
			},
			prevRange = function () {
				rangeStart = rangeStart - rangeMax;
				rangeEnd = rangeStart + rangeMax - 1;
				scope.pages = [];
				for (var i = rangeStart; i <= rangeEnd; i++) {
					scope.pages.push(i);
				}
			},
			nextRange = function (init) {
				rangeStart = rangeStart + rangeMax;
				rangeEnd = scope.numPages < (rangeEnd + rangeMax) ? scope.numPages : rangeEnd + rangeMax;
				scope.pages = [];
				for (var i = rangeStart; i <= rangeEnd; i++) {
					scope.pages.push(i);
				}
			};

			// public
			scope.$watch("numPages", function (val) {
				if(val != 0)// we get 0 first time
					init();
			});
			scope.noPrevious = function () {
				return scope.currentPage === 1;
			};
			scope.noNext = function () {
				return scope.currentPage === scope.numPages;
			};
			scope.isActive = function (page) {
				return scope.currentPage === page;
			};

			scope.selectPage = function (page) {
				if (!scope.isActive(page)) {
					scope.currentPage = page;
					scope.onSelectPage({ page: page });
				}
			};
			scope.selectPrevious = function () {
				if (!scope.noPrevious()) {
					if (scope.currentPage == rangeStart && rangeStart > 1)
						prevRange();
					scope.selectPage(scope.currentPage - 1);
				}
			};
			scope.selectNext = function () {
				if (!scope.noNext()) {
					if (scope.currentPage == rangeEnd && scope.numPages > scope.currentPage)
						nextRange();
					scope.selectPage(scope.currentPage + 1);
				}
			};

			// events
			scope.$on("pagination_init", init);
			scope.$on("pagination_prevPage", scope.selectPrevious);
			scope.$on("pagination_nextPage", scope.selectNext);

		}//link fcn
	};
});
