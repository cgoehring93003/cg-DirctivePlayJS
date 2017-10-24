
myApp.directive(
    "editControls", function ($compile) {
    return {
        restrict: 'A',	
        transclude:  false,
		replace: true,    

        compile: function (element, attrs) {  // Here, scope needs no $ because any name would suffice.

            //  Below would be the link function - convention is to use scope instad of $scope because position is what is important here.
            return function (scope, $element, $attrs) {

                var star = $attrs["star"];

				var htmlButton1Code ='<a class="btn btn-primary btn-sm" href="#/edit/' + star + '" >EDIT</a>';
				var htmlButton2Code ='<a class="btn btn-primary btn-sm" href="#/preDelete/' + star + '" >DELETE</a>';

                var newcontent = $compile(htmlButton1Code + htmlButton2Code)(scope);

                $element.append(newcontent);

				return;
			}
		},

        link: function link( $scope, element, attributes, controller ) {
                var linkRecno = attributes["recno"];
                var linkDummy = attributes["dummy"];

                var star = attributes["star"];               

	        }

		}
	}

);




	