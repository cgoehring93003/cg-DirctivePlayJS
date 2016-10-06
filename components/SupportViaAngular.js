


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



app.controller('AuxController', ['$scope', '$http', 'Restangular', function ($scope, $http, Restangular) {


    // prefparms.orderby split??
    $scope.SortColumns = [];  // sortcols from control markup (do split and trim)

    var choicesAvailable = $("#mySortPicker").attr('sortcols');  //Selections
    var choicesMade = $("#mySortPicker").attr('selections');  //Selections

    var tchoicesAvailable = choicesAvailable.split(',');
    tchoicesAvailable.forEach(function (pick) {
        $scope.SortColumns.push(pick.trim());
    });



    $scope.planb = '';

    // Backing for the grid of radio and check buttons.
    // Moved to directive
    //$scope.FormBacker = [];


    $scope.dumpval = function () {
        $scope.dodumpobj('$scope.FormBacker: ' + $scope.FormBacker);
    }

    // See remaining init at bottom of controller code.

    //TODO: funcion name swapping for debug purposes..
    // Two things need to be done.  a) update the orderby value eveerywhere it need updated  b) alter the url in the browser and re-load the page.
    // a) should be done when the chosen short order is changed
    // b) should be done when the page must be reloaded.
    // Both of these must happen when the api or sort order changes - no exceptions
    $scope.afterChoiceOfApiForDataR = function () {
        console.log('afterChoiceOfApiForDataR: called');
        $('div.jmsg').html(prefparms.ApiForDataR);

        var ourlstr = window.location.toString();
        var nurlstr = this.replaceApiChoicInUrl(window.location.toString(), prefparms.ApiForDataR);

        if (ourlstr != nurlstr) {

            console.log('afterChoiceOfApiForDataR: Going to ' + nurlstr + ' via assign.');

            window.location.assign(nurlstr); //??

        }

        console.log('afterChoiceOfApiForDataR: prefparms.orderby: ' + prefparms.orderby);

        $('div.jmsg').html(prefparms.ApiForDataR);  //  display
    }


    // This functoion is called in the map html markup.
    $scope.setDirectiveFn = function (directiveFn) {
        $scope.directiveFn = directiveFn;
    };


    
    // All in link below
    // http://localhost/MVCClient/Invoice?ApiForDataR=API&MatchingController=&paginate=true&orderby=InvoiceID%2C%20AccountID%2C%20InvoiceNumber%20desc&startpage=1&pagelength=20&pagegroupno=1&pagegroupsize=8&pageno=1&criteria=&pagelinks=&PostbackPrefix=http%3A%2F%2FDellMonte%2FMVCClient%2F&ProjectServerUrl=http%3A%2F%2FDellMonte%2FWebApi2ProjectService%2F
    // http://localhost/MVCClient/Invoice?ApiForDataR=API&MatchingController=&
    //paginate=true&
    //orderby=InvoiceID%2C%20AccountID%2C%20InvoiceNumber%20desc&
    //startpage=1&
    //pagelength=20&
    //pagegroupno=1&
    //pagegroupsize=8&pageno=1&criteria=&
    //pagelinks=&
    //PostbackPrefix=http%3A%2F%2FDellMonte%2FMVCClient%2F&
    //ProjectServerUrl=http%3A%2F%2FDellMonte%2FWebApi2ProjectService%2F



    $scope.namemap = {

        ApiForDataR: 'md',
        orderby: 'ob',
        startpage: 'sp',
        pagelength: 'pl',
        pagegroupno: 'pgp',
        pagegroupsize: 'pgs',
        paginate: 'pgt',
        pageno: 'pn',
        criteria: 'cri',
        pagelinks: 'pli', 
        PostbackPrefix: 'pbp',
        ProjectServerUrl: 'psu'
    };



    //TODO: Not needed??
    $scope.getSmallName = function (longname) {
        console.log('getSmallName: inputString: in: ' + longname + '  out: ' + this.namemap[longname])
        return this.namemap[longname];
    }

    /*
     * This builds the url that is loaded to the browser to swith api and control sort order and filter criteria.
     * It doesn't make the url used from the back-end to retrieve data (as in the case of web api).
     *
     * Need to:
     *      Extract out the proto and server
     *      Extract out the api.
     *      Get the order by from the component elements 
     *      Get criteria, if implimented
     *      Build up new url by applying names for each url segment and using encodeURIComponent 
     *      Set location 
     * 
     * 
     * This is hosiing up somewhere:
     * http://dellmonte/MVCClient/Invoice?md=API&&&sp=0&pl=10&pgp=0&pgs=10&pn=0&&&pbp=http%3A%2F%2FDellMonte%2FMVCClient%2F&psu=http%3A%2F%2FDellMonte%2FWebApi2ProjectService%2F 
     * 
     * 1 after API is three &s
     * 2 same before pbp
     * 
     */



    $scope.pageForward = function () {

    }


    $scope.pageBack = function () {

    }

    $scope.processUrl = function () {

        // Get current url
        var oldurlstr = window.location;

        //      Extract out the proto and server
        var oldURI = URI(oldurlstr);
        var oldprot = oldURI.protocol();
        var oldpat = oldURI.path();
        var oldqry = oldURI.query();

        console.log('oldurlstr: ' + oldurlstr);
        console.log('oldURI: ' + oldURI);
        console.log('oldprot: ' + oldprot);
        console.log('oldpat: ' + oldpat);
        console.log('oldqry: ' + oldqry);

        var newAPIValue = this.prefparms.ApiForDataR;
        //      Extract out the api.
        var oldAPIValue = '';
        if (newAPIValue == 'API')
            oldAPIValue = 'md=WCF';
        else
            oldAPIValue = 'md=API';

        // Below is unaffected if old = new
        var newqry = oldqry.replace(oldAPIValue, 'md=' + newAPIValue);  

        //      Get the order by from the component elements 
        // used bellow - stored in prefparms
        var newob = this.getSortOrderClause();

        if ((newob == null) || (newob == ""))
            console.log('processUrl: getSortOrderClause: newob: null or empty *************');
        else
            console.log('processUrl: getSortOrderClause: newob: ' + newob);


        var shortname = '';

        this.prefparms.orderby = newob;
 
        //     $scope.prefparms = prefparms;
        var parastr = "";
        for (var key in this.prefparms) {
            console.log('processUrl: key: ' + key);

            shortname = this.getSmallName(key);
            if (typeof shortname === 'undefined' || shortname === '')
                continue;

            if (shortname === 'sp')
                var pausepoint = 'pause';



            // Must skip if null or blank
            if ((this.prefparms[key] !== 'undefined') && (this.prefparms[key].toString() != "")) {

                if (typeof this.prefparms[key] === 'boolean') {
                    if (parastr != "") {
                        parastr += "&";
                    }
                    parastr += shortname + "=" + encodeURIComponent(this.myTrim(this.prefparms[key].toString()));
                } else {
                    if (typeof this.prefparms[key] === 'number') {
                        if (parastr != "") {
                            parastr += "&";
                        }
                        parastr += shortname + "=" + encodeURIComponent(this.myTrim(this.prefparms[key].toString()));
                    } else {
                        if (typeof this.prefparms[key] === 'string') {
                            if (parastr != "") {
                                parastr += "&";
                            }
                            parastr += shortname + "=" + encodeURIComponent(this.myTrim(this.prefparms[key]));
                        } else {
                            if (parastr != "") {
                                parastr += "&";
                            }
                            parastr += shortname + "=" + encodeURIComponent(this.myTrim("" + this.prefparms[key]));
                        }
                    }
                }
            }
        }

        if (parastr.indexOf('&&') > -1)
            consol.log('processUrl: && detected in new url: ' + parastr);


        console.log('processUrl: parastr: ' + parastr);


        var newurlstr = oldprot + '://' + oldURI.host() + oldpat + '?' + parastr;


        //      Get criteria, if implimented
        //      Build up new url by applying names for each url segment and using encodeURIComponent 


        //      Set location 
        //if (oldurlstr != newurlstr) {
        //if (URI(oldurlstr).equals(newurlstr) === true) {
        if (oldURI.equals(URI(newurlstr)) === true) {

            // Do nothing - noop

        }   else {

            console.log('processUrl: Going to ' + newurlstr + ' via assign.');

            window.location.assign(newurlstr);

        }


    }
    // Called from getSortOrderClause
    // Assumes one is selected.
    $scope.getSortLevel = function (rootElementName) {

        var questvalue = 'row' + rootElementName;
        var radiosInRow = document.getElementsByName(questvalue);
        if ((radiosInRow === undefined) || (radiosInRow.length == 0))
            console.log('dbg: getSortLevel: Nothing found for ' + questvalue);

        // loop on list of radio until checked one found
        for (var ilp = 0; ilp < radiosInRow.length; ilp++) {

            if (radiosInRow[ilp].checked == true)
                return radiosInRow[ilp].value;

        }

    }

    $scope.getSortWithDirectional = function (rootElementName) {

        var whereItem = '';

        var questvalue = 'cbrow' + rootElementName;
        var directional = document.getElementById(questvalue);
        if (directional === undefined)
            console.log('dbg: getSortWithDirectional: Nothing found for ' + questvalue);

        if (directional.checked == true)
            whereItem = rootElementName + ' desc';
        else
            whereItem = rootElementName;

        return whereItem;
    }


    // Currrently, only used on prefs screen.
    $scope.getSortOrderClause = function () {
        var whereItem = '';
        var sl = '';
        var wi = '';
        var corrected = 0;
        console.log('getSortOrderClause');

        //TODO: obsolete?
        var picks = [this.SortColumns.length];

        //if ((picks == null) || (picks == 0))
        //    alert('getSortOrderClause  : issue with SortColumns');


        // Zero out each array
        for (var ilooperx = 0; ilooperx < this.SortColumns.length; ilooperx++) {
            picks[ilooperx] = [];
        }


        for (var ind = 0; ind < this.SortColumns.length; ind++) {

            sl = this.getSortLevel(this.SortColumns[ind]);

            if (sl === undefined)  //  == '0')
                continue;

            if (sl === '0')
                continue;

            whereItem = this.getSortWithDirectional(this.SortColumns[ind]);

            corrected = sl - 1;  //TODO;  Intermittent error on next line.  length on undefined ???

            // Should this be push()
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

        console.log('getSortOrderClause: orderBy: ' + orderBy);

        //var postablefield = document.getElementById('orderClause');

        // postablefield.value = orderBy;


        //console.log('getSortOrderClause: postablefield.value=' + postablefield.value)

        //prefparms.orderby = $('#orderClause').val();

        console.log('getSortOrderClause: orderBy: ' + orderBy);

        return orderBy;
    }






    $scope.myTrim = function (inputString) {
        return inputString.replace(/^\s+|\s+$/gm, '');
    }


    $scope.dodumpprefsobj = function () {
        this.dumpobj($scope.prefparms);
    }


    // Just a test to see if it is possible to lo to the consol from within angular.
    $scope.relog = function (msg) {

        console.log(msg);
    }


    // Muct be called early.
    // this is for hidden html element method method
    $scope.getPrefsx2 = function () {

        $scope.prefparms  = {};

        $scope.prefparms.ApiForDataR = $('#myApiForDataR').val();
        $scope.prefparms.MatchingController = $('#myMatchingController').val();
        $scope.prefparms.paginate = $('#mypaginate').val();
        $scope.prefparms.orderby = $('#myorderby').val();
                    //prefXR2.startpage = $('#mystartpage').val();
        var startpageT = $('#mystartpage').val();
        $scope.prefparms.startpage = parseInt(startpageT);  //0;
                     //prefXR2.pagelength = $('#mypagelength').val();
        var pagelengthT = $('#mypagelength').val();
        $scope.prefparms.pagelength = parseInt(pagelengthT); //10;

                    //prefXR2.pagegroupno = $('#mypagegroupno').val();
        var pagegroupnoT = $('#mypagegroupno').val();
        $scope.prefparms.pagegroupno = parseInt(pagegroupnoT);  //0;
                    //prefXR2.pagegroupsize = $('#mypagegroupsize').val();
        var pagegroupsizeT = $('#mypagegroupsize').val();
        $scope.prefparms.pagegroupsize = parseInt(pagegroupsizeT);  //7;
                    //prefXR2.pageno = $('#mypageno').val();
        var pagenoT = $('#mypageno').val();
        $scope.prefparms.pageno = parseInt(pagenoT);  //0;

        $scope.prefparms.criteria = $('#mycriteria').val();
        $scope.prefparms.pagelinks = $('#mypagelinks').val();
        $scope.prefparms.PostbackPrefix = $('#myPostbackPrefix').val();
        $scope.prefparms.ProjectServerUrl = $('#myProjectServerUrl').val();

        console.log('getPrefsx2: ----------------------------------');

        console.log("getPrefsx2: prefparms.ApiForDataR: " + $scope.prefparms.ApiForDataR);
        console.log('getPrefsx2: ApiForDataR: ' + $scope.prefparms.ApiForDataR);
        console.log('getPrefsx2: paginate: ' + $scope.prefparms.paginate);
        console.log('getPrefsx2: orderby: ' + $scope.prefparms.orderby);
        console.log('getPrefsx2: startpage: ' + $scope.prefparms.startpage);
        console.log('getPrefsx2: pagelength: ' + $scope.prefparms.pagelength);
        console.log('getPrefsx2: pagegroupno: ' + $scope.prefparms.pagegroupno);
        console.log('getPrefsx2: pagegroupsize: ' + $scope.prefparms.pagegroupsize);
        console.log('getPrefsx2: pageno: ' + $scope.prefparms.pageno);
        console.log('getPrefsx2: criteria: ' + $scope.prefparms.criteria);
        console.log('getPrefsx2: pagelinks: ' + $scope.prefparms.pagelinks);
        console.log('getPrefsx2: PostbackPrefix: ' + $scope.prefparms.PostbackPrefix);

        console.log('getPrefsx2: ----------------------------------');

        return;
    }

    // Moved to directive
    //$scope.doSetDefaults();

    // This must be called to initialiaze prefparms
    $scope.getPrefsx2();

    console.log('AuxController: end of controller AuxController');
}]);  // End of AuxController
