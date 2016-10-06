	
	myApp.directive('rnStepper', function() {
    return {
        restrict: 'AE',
        scope: {},
        template: '<button ng-click="decrement()">-</button>' +
                  '<div>{{ value }}</div>' +
                  '<button ng-click="increment()">+</button>',
        link: function(scope, iElement, iAttrs, ngModelController) {

            // update the value when user clicks the buttons
            scope.decrement = function() {
                updateModel(-1);
            };
            scope.increment = function() {
                updateModel(+1);
            };
        }
    };
	
	
});



    myApp.directive("sortClauseBuilder", function ($compile) {
        return {

            restrict: "A",
            scope: false,  // Allows writing to controller variable SortColumns.
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
                    $scope.orderClause = 'oder';


                    if ((sortcols != null) && (sortcols != ''))
                    {
                        console.log('compile: sortcols != null')
                        sortcolsArray = sortcols.split('.');
                    }
                    else
                    {
                        console.log('compile: sortcols == null')
                        sortcolsArray = recordTypeSortChoices["Addresses of the Stars"];
                    }

                    $scope.SortColumns = sortcolsArray;


                    if (angular.isArray(sortcolsArray)) {

                        var newcontent1 = makesortpick(sortcolsArray, $scope.pickername, sortlevsXX);
                        var newcontent = $compile(newcontent1)($scope);

                        element.append(newcontent);
                    }

                }
            }

        }
    })

	
	