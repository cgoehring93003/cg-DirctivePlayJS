


myApp.directive("simplePatternValidator", function ($compile) {
	return {

		restrict: "A",
		require: 'ngModel',
		replace: false,
		scope: false,  // Allows writing to controller variable.
		compile: function (element, attrs) {  // Here, scope needs no $ because any name would suffice.

			//  Below would be the link function
			return function ($scope, $element, $attrs, ctrl) {

				$scope.validatorname = $attrs["validatorname"];			
			

				var dattrscnt = $attrs.Length;
				console.log('simplePatternValidator:  compile:  ')

				var pattern = $attrs["pattern"];
				console.log('compile: pattern =' + pattern)

				//get the regex flags from the regex-validate-flags="" attribute (optional)
				//var flags = $attrs.regexValidateFlags || '';
				
				// create the regex obj.
				var regex = new RegExp(pattern, '');     // flags  		

				
            // add a parser that will process each time the value is 
            // parsed into the model when the user updates it.
            ctrl.$parsers.unshift(function(value) {
                // test and set the validity after update.
                var valid = regex.test(value);
                ctrl.$setValidity('simplePatternValidator', valid);
                
                // if it's valid, return the value to the model, 
                // otherwise return undefined.
                return valid ? value : undefined;
            });				
            // add a formatter that will process each time the value 
            // is updated on the DOM element.
            ctrl.$formatters.unshift(function(value) {
                // validate.
                ctrl.$setValidity('simplePatternValidator', regex.test(value));
                
                // return the value or nothing will be written to the DOM.
                return value;
            });				
				
				//var newcontent1 = "<input type='text' name='" + $scope.validatorname + "' regex-validate-flags='i'/>";
				
				//var newcontent = $compile(newcontent1)($scope);

				//element.append(newcontent);


			}
		}

	}
});

myApp.directive('mySharedScope', function () {
    return {
        template: 'Name: nm<br /> Street: strt'
    };
});	
myApp.directive('myCustomer', function() {
  return {
    restrict: 'E',
    scope: {
      customerInfo: '=what'
    },
    templateUrl: 'templates/my-customer-iso-what.html'
  };
});

myApp.directive("myTable", function() {
    return {
		replace: true,
        templateUrl : 'templates/myTableTemplate.html'

    };
});		


myApp.directive("sortClauseBuilder", function ($compile) {
	return {

		restrict: "A",
		//scope: true,  // Allows writing to controller variable SortColumns.
		scope: {   // 
            setFn: '&'  // '&' is for function reference
        },
		
		compile: function (element, attrs) {  // Here, scope needs no $ because any name would suffice.

			var aasortlevs = attrs.sortlevs;		// good
		
			
			//  Below would be the link function
			return function ($scope, $element, $attrs) {

				var dattrscnt = $attrs.Length;

				console.log(' sortClauseBuilder:  compile:  ')

				var sortcols = $attrs["sortcols"];
				$scope.sortlevs = $attrs["sortlevs"];
				var sortlevsXX = $attrs["sortlevs"];
				$scope.pickername = $attrs["pickername"];
				$scope.orderClause = $attrs["tablename"];
				$scope.tablename = $attrs["tablename"];	
				
				console.log('$scope.tablename: ' + $scope.tablename);
                $scope.externalCall = function () {  // updateMap
                    alert('inside externalCall()');
                }

                $scope.setFn({ 
					theDirFn: $scope.externalCall 
				});				

				/*
				if ((sortcols != null) && (sortcols != ''))
				{
					console.log('compile: sortcols != null')
					sortcolsArray = sortcols.split('.');
				}
				else
				{ */
					console.log('compile: sortcols == null')
					sortcolsArray = recordTypeSortChoices[$scope.tablename];
				//}

				$scope.SortColumns = sortcolsArray;


				if (angular.isArray(sortcolsArray)) {

					var newcontent1 = makesortpick(sortcolsArray, $scope.pickername, sortlevsXX);
					var newcontent = $compile(newcontent1)($scope);

					element.append(newcontent);
				}

			}
		}

	}
});

	
	