


// See SortClauseBuilderComponent.js
var app = angular.module('projectsApp', ['restangular']);

app.constant('apiUrl', 'http://bigdell/WebApi2ProjectService');


app.constant('domain', 'http://derlist.com')
app.constant('api', '/some/api/info')
app.service('urls', function (domain, api) { this.apiUrl = domain + api; });


app.directive("sortClauseBuilder", function ($compile) {

    return {

        restrict: "AE",
        //scope: false,  //TODO: re-visit  Allows writing to controller variable SortColumns.
        // Excellent article http://www.undefinednull.com/2014/02/11/mastering-the-scope-of-a-directive-in-angularjs/
        scope: {   // Caused "issue with SortColumns" error 
            SortColumns: '@',  //TODO:  These added 2016-01-02  
            selections: '@',  // '=' is for two way
            FormBacker: '@',  // '@' is one way
            setFn: '&'  // '&' is for function reference
        },
        //controller: 'AuxController',  // This sets where backing data for ngModel is stored 
        compile: function (element, attrs) {  // Here, scope needs no $ because any name would suffice.




            //  Below would be the link function - convention is to use scope instad of $scope because position is what is important here.
            return function (scope, $element, $attrs) {

                console.log('sortClauseBuilder:  compile:  myCurrentController: ' + myCurrentController)

                // Control element attributes
                var sortcols = $attrs["sortcols"];
                scope.sortlevs = $attrs["sortlevs"];
                scope.pickername = $attrs["pickername"];

                scope.selections = $attrs["selections"];


                scope.forwardUrl = 'http://forwardUrl';
                scope.backUrl = 'http://backUrl';



                if ((sortcols == null) || (sortcols == ''))
                    console.log('compile: sortcols == null')

                // set defaults and load choices from attibutes above.

                scope.FormBacker = [];

                scope.externalCall = function () {  // updateMap
                    alert('inside externalCall()');
                }

                scope.setFn({ theDirFn: scope.externalCall });

                //
                //  Moved in start
                //

                scope.dumpval = function () {
                    $scope.dodumpobj('$scope.FormBacker: ' + scope.FormBacker);
                }

                scope.dodumpbackerobj = function () {
                    this.dumpobj(scope.FormBacker);
                }
                scope.dodumpobj = function () {
                    this.dumpobj(scope.FormBacker);
                }

                scope.dumpobj = function (obje) {

                    var keys = Object.keys(obje);
                    for (iloop = 0; iloop < keys.length; iloop++) {
                        console.log('dumpobj: index: ' + keys[iloop] + ' ' + obje[keys[iloop]]);

                    }
                }

                scope.doSetDefaults = function () {

                    var mySortOptions = $("#mySortPicker").attr('sortcols');

                    return scope.SetDefaults(mySortOptions, scope.FormBacker);
                }

                // Currrently, only used on prefs screen.
                scope.SetDefaults = function (sortcols, fbobject) {

                    var cols = sortcols.split(",");
                    var itemtokenroot = '';
                    var itemtoken = '';

                    for (var colno = 0; colno < cols.length; colno++) {
                        itemtokenroot = 'row' + cols[colno].trim();
                        itemtoken = itemtokenroot + 'Sort';
                        fbobject[itemtoken] = 0;
                        fbobject[itemtokenroot + 'Desc'] = false;
                    }
                    fbobject['paginate'] = true;

                }

                scope.doreLoadClauses = function (selattrlstr) {

                    return scope.reLoadClauses(selattrlstr, scope.FormBacker);
                }

                // Call this after SetDefaults to load the html tag values for the given record type.
                scope.reLoadClauses = function (selattrlstr, fbobject) {

                    console.log('reLoadClauses: input: selattrlstr: ' + selattrlstr);

                    var selattrChunks = selattrlstr.split(",");

                    for (var clauseChunk = 0; clauseChunk < selattrChunks.length; clauseChunk++) {

                        selattrChunks[clauseChunk] = selattrChunks[clauseChunk].trim();

                        console.log('reLoadClauses: selattrChunks[' + clauseChunk + ']: ' + selattrChunks[clauseChunk]);
                        if (selattrChunks[clauseChunk].indexOf("desc") > -1) {

                            // Has 'desc', need two ui items set. Split to strip off second word.

                            var clauseChunks = selattrChunks[clauseChunk].split(" ");

                            var thecbid = 'row' + clauseChunks[0];  // cbrowInvoiceID
                            var key = 'row' + clauseChunks[0] + 'Sort';
                            fbobject[key] = (clauseChunk + 1);  // Detected sorts must start at one.  Zero is for N/A.
                            key = 'row' + clauseChunks[0] + 'Desc';
                            fbobject[key] = true;
                            console.log('reLoadClauses: key: ' + key + ' selattrChunks[' + clauseChunk + ']: ' + selattrChunks[clauseChunk] + ' thecbid: ' + thecbid);
                        } else {
                            // Only one UI  item
                            var therbid = 'row' + clauseChunks[0] + clauseChunk;  // rbrowInvoiceID1
                            var key = 'row' + clauseChunks[0] + 'Sort';
                            fbobject[key] = (clauseChunk + 1);
                            console.log('reLoadClauses: key: ' + key + ' selattrChunks[' + clauseChunk + ']: ' + selattrChunks[clauseChunk] + ' therbid: ' + therbid);

                        }
                    }

                }

                scope.doreLoadpaginatesFromUrl = function (urllstr) {

                    return scope.reLoadClauses(urllstr, scope.FormBacker);
                }

                // Currrently, only used on prefs screen.
                scope.reLoadpaginatesFromUrl = function (urllstr) {
                    return scope.reLoadClausesFromUrl(urllstr, scope.FormBacker);
                }

                // Currrently, only used on prefs screen.
                scope.reLoadClausesFromUrl = function (urllstr, fbobject) {

                    // Thisw option for dev only.
                    if (urllstr == null || urllstr == '')
                        urllstr = this.getSortOrderClause();

                    console.log('reLoadClausesFromUrl: getSortOrderClause: urllstr: ' + urllstr);

                    var urlChunks = urllstr.split(",");

                    for (var clauseChunk = 0; clauseChunk < urlChunks.length; clauseChunk++) {

                        console.log('reLoadClausesFromUrl: urlChunks[clauseChunk]: ' + urlChunks[clauseChunk]);
                        if (urlChunks[clauseChunk].indexOf("desc") > -1) {

                            // Need desc tag 
                            var clauseChunks = urlChunks[clauseChunk].split(" ");

                            if ((clauseChunks.length == 2) && (clauseChunks[1] == "desc")) {
                                console.log('reLoadClausesFromUrl: clauseChunks[0]: ' + clauseChunks[0]);
                                console.log('reLoadClausesFromUrl: id: ' + clauseChunks[0]);

                                // set cb checked
                                var thecbid = 'cbrow' + clauseChunks[0];  // cbrowInvoiceID

                            } else {


                                console.log('reLoadClausesFromUrl: urlChunks[clauseChunk]: ' + urlChunks[clauseChunk]);
                            }

                            // Set rb checked
                            var therbid = 'rbrow' + clauseChunks[0] + clauseChunk;  // rbrowInvoiceID1

                        }
                    }

                }

                // 
                // These "fromModel" jobbies had been removed.  But, it is probabbly more efficient to get the answers from the 
                // model instead of from the ui controls, since the model/backer is in use.
                //

                scope.getSortWithDirectionalFromModel = function (rootElementName) {

                    var whereItem = '';

                    var questvalue = 'cbrow' + rootElementName;
                    var directional = document.getElementById(questvalue);
                    if (directional === undefined)
                        console.log('dbg: getSortWithDirectionalFromModel: Nothing found for ' + questvalue);

                    if (directional.checked == true)
                        whereItem = rootElementName + ' desc';
                    else
                        whereItem = rootElementName;

                    return whereItem;
                }

                // Currrently, only used on prefs screen.
                scope.getSortOrderClauseFromModel = function () {
                    var whereItem = '';
                    var sl = '';
                    var wi = '';
                    var corrected = 0;
                    console.log('getSortOrderClauseFromModel');

                    var keys = Object.keys(scope.FormBacker); //.sort();

                    var thecount = keys.length;

                    keys.forEach(function (key) {

                        console.log('key: ' + key + ': ' + FormBacker[key]);

                    });

                    for (var ilooperx = 0; ilooperx < this.SortColumns.length; ilooperx++) {
                        picks[ilooperx] = [];
                    }

                    for (var ind = 0; ind < this.SortColumns.length; ind++) {

                        sl = this.getSortLevel(this.SortColumns[ind]);

                        if (sl === undefined)  //  == '0')
                            continue;

                        if (sl === '0')
                            continue;

                        whereItem = this.getSortWithDirectionalFromModel(this.SortColumns[ind]);

                        corrected = sl - 1;  //TODO;  Intermittent error on next line.  length on undefined ???
                        picks[corrected][picks[corrected].length] = whereItem;  /// Always add

                    } // for


                    // Assuming all can be selected
                    var orderBy = '';
                    for (var ilooperx = 0; ilooperx < this.SortColumns.length; ilooperx++) {
                        for (var iloopery = 0; iloopery < picks[ilooperx].length; iloopery++) {

                            if (picks[ilooperx][iloopery] != "undefined")
                                if (orderBy != "")
                                    orderBy += ", " + picks[ilooperx][iloopery];
                                else
                                    orderBy += " " + picks[ilooperx][iloopery];

                        }

                    }

                    console.log('getSortOrderClauseFromModel: orderBy: ' + orderBy);

                    //var postablefield = document.getElementById('orderClause');

                    // postablefield.value = orderBy;


                    //console.log('getSortOrderClause: postablefield.value=' + postablefield.value)

                    //prefparms.orderby = $('#orderClause').val();

                    console.log('getSortOrderClauseFromModel: orderBy: ' + orderBy);

                    return orderBy;
                }



                //
                // Moved in end
                //



                //
                //  Wondering if I should move the code for the backing back to here instead of having backing modle variables in the AuxController ,
                //  Need to add logic to load previous choices from the html tag and that must?? be done here when the page is reloaded.????
                //Links I was viewing when had to re-boot.
                // Lots there on DOM code vs other code.
                // http://blog.thoughtram.io/angularjs/2015/01/02/exploring-angular-1.3-bindToController.html
                // https://thinkster.io/a-better-way-to-learn-angularjs/directives-talking-to-controllers
                // https://docs.angularjs.org/guide/directive
                // http://jasonmore.net/angular-js-directives-difference-controller-link/
                // http://www.bennadel.com/blog/2447-exploring-directive-controllers-compiling-linking-and-priority-in-angularjs.htm
                // More on ControllerAs:
                // https://toddmotto.com/no-scope-soup-bind-to-controller-angularjs/

                ///

                // Test junk
                scope.myobj = [];


                scope.xdumpval = function () {


                    scope.xdodumpobj('scope.myobj: ' + scope.myobj);
                }

                scope.xdodumpobj = function () {
                    this.xdumpobj(scope.myobj);
                }

                scope.xdumpobj = function (obje) {

                    var keys = Object.keys(obje);
                    for (iloop = 0; iloop < keys.length; iloop++) {
                        console.log('xdumpobj: index: ' + keys[iloop] + ' ' + obje[keys[iloop]]);

                    }
                }


                var newcontent1 = makesortpick(scope.pickername, scope.selections);
                var newcontent = $compile(newcontent1)(scope);

                element.append(newcontent);

                //
                // Finish initialization
                //

                scope.doSetDefaults(); // Moved from controller

                scope.doreLoadClauses(scope.selections);


            }
        }

    }
});

//
//
//  Note that above here, scope is used instead of $scope 
//
//



// This controller strictly experimental.
app.controller('BuxController', ['$scope', '$http', function ($scope, $http) {
    
    // Muct be called early.
    // this is for hidden html element method method
    $scope.getCallResults = function () {

        var a2 = {};

        a2.ApiForDataR = $('#myApiForDataR').val();

        console.log("getCallResults: prefXR2.ApiForDataR: " + a2.ApiForDataR);
        console.log('getCallResults: ApiForDataR: ' + a2.ApiForDataR);

        return a2;
    }

    // THis must be called to initialiaze prefparms
    var ax = $scope.getCallResults();

    console.log('BxController: end of controller BxController: ax.ApiForDataR: ' + ax.ApiForDataR);

}]);


