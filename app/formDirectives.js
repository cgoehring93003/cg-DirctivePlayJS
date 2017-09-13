


myApp.directive("myTable", function() {
    return {
        restrict: 'AE',		
		replace: true,
		// scope: {
			// records: '=',
		// },
        templateUrl : 'templates/myTableTemplate.html',
            link: function ($scope, element, attrs, fn) {

				var tableColumns =  attrs['cols'];
			
			
                // $scope.$watch('records', function () {

                    // if (!$scope.records.length) {
                        // $scope.empty = true;
                        // return;
                    // }
					// tableColumns = tableColumns.replace(", ", ",");
					// $scope.keys = tableColumns.split(',');

                    // //$scope.keys = Object.keys($scope.tableData[0]);
                // });

            }		

    };
});		



	