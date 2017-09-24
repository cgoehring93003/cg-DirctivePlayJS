
myApp.directive("myTable", function() {
    return {
        restrict: 'AE',		
		replace: true,
        templateUrl : 'templates/myTableTemplate.html',
            link: function ($scope, element, attrs, fn) {

				var tableColumns =  attrs['cols'];
				tableColumns = tableColumns.replace('""', '"');
				tableColumns = tableColumns.replace(", ", ",");
				$scope.keys = tableColumns.split(',');
            }		

    };
});		


myApp.directive(
    "editControls", function ($compile) {
    return {
        restrict: 'E',	
        transclude:true,
        //scope: { recno :'='},	
		replace: true,    
        controller: function Controller( $scope ) {
            console.log( "editControls - Controller" );
        },


        compile: function (element, attrs) {  // Here, scope needs no $ because any name would suffice.

            //  Below would be the link function - convention is to use scope instad of $scope because position is what is important here.
            return function (scope, $element, $attrs) {

                //console.log('editControls:  compile:  myCurrentController: ')

                var star = $attrs["star"];
                //console.log('editControls:  compile:  star: ' + star);

				//console.log($attrs);
				//console.log(scope);

				//var htmlButton1Code ='<a class="btn btn-primary btn-sm" href="http://localhost:3069/directivePlay/index.html#/edit/' + star + '" >EDIT</a>';
				//var htmlButton2Code ='<a class="btn btn-primary btn-sm" href="http://localhost:3069/directivePlay/index.html#/delete/' + star + '" >DELETE</a>';

				var htmlButton1Code ='<a class="btn btn-primary btn-sm" href="#/edit/' + star + '" >EDIT</a>';
				var htmlButton2Code ='<a class="btn btn-primary btn-sm" href="#/delete/' + star + '" >DELETE</a>';

                var newcontent = $compile(htmlButton1Code + htmlButton2Code)(scope);

                $element.append(newcontent);

				return;
			}
		},

        link: function link( $scope, element, attributes, controller ) {
            //console.log( "editControls - Link" );

                var linkRecno = attributes["recno"];
                var linkDummy = attributes["dummy"];

                var star = attributes["star"];               

                //console.log('editControls:  link:  linkDummy: ' + linkDummy);
                //console.log('editControls:  link:  linkRecno: ' + linkRecno);
                //console.log('editControls:  link:  linkRecno: ' + linkRecno.recno);

				//console.log(attributes);


				//console.log($scope);
/*
				var htmlButton1Code ='<a class="btn btn-primary btn-sm" href="#/edit/' + star + '" >EDIT</a>';
				var htmlButton2Code ='<a class="btn btn-primary btn-sm" href="#/delete/' + star + '" >DELETE</a>';

                var newcontent = $compile(htmlButton1Code + htmlButton2Code)(scope);

                element.append(newcontent);
                */
	        }

		}
	}

);




	