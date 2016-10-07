


myApp.controller('SortBuilderController', ['$http', function ($http) {

	var SortBuilder = this;	
		
    // prefparms.orderby split??
    SortBuilder.SortColumns = [];  // sortcols from control markup (do split and trim)

    var choicesAvailable = $("#mySortPicker").attr('sortcols');  //Selections
    var choicesMade = $("#mySortPicker").attr('selections');  //Selections

    var tchoicesAvailable = choicesAvailable.split(',');
    tchoicesAvailable.forEach(function (pick) {
        SortBuilder.SortColumns.push(pick.trim());
    });



    SortBuilder.planb = '';

    // Backing for the grid of radio and check buttons.
    // Moved to directive
    //SortBuilder.FormBacker = [];


    SortBuilder.dumpval = function () {
        SortBuilder.dodumpobj('SortBuilder.FormBacker: ' + SortBuilder.FormBacker);
    }

    // See remaining init at bottom of controller code.

    //TODO: funcion name swapping for debug purposes..
    // Two things need to be done.  a) update the orderby value eveerywhere it need updated  b) alter the url in the browser and re-load the page.
    // a) should be done when the chosen short order is changed
    // b) should be done when the page must be reloaded.
    // Both of these must happen when the api or sort order changes - no exceptions
    SortBuilder.afterChoiceOfApiForDataR = function () {
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
    SortBuilder.setDirectiveFn = function (directiveFn) {
        SortBuilder.directiveFn = directiveFn;
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



    SortBuilder.namemap = {

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
    SortBuilder.getSmallName = function (longname) {
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



    SortBuilder.pageForward = function () {

    }


    SortBuilder.pageBack = function () {

    }

    SortBuilder.processUrl = function () {

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
 
        //     SortBuilder.prefparms = prefparms;
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
    SortBuilder.getSortLevel = function (rootElementName) {

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

    SortBuilder.getSortWithDirectional = function (rootElementName) {

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
    SortBuilder.getSortOrderClause = function () {
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






    SortBuilder.myTrim = function (inputString) {
        return inputString.replace(/^\s+|\s+$/gm, '');
    }


    SortBuilder.dodumpprefsobj = function () {
        this.dumpobj(SortBuilder.prefparms);
    }


    // Just a test to see if it is possible to lo to the consol from within angular.
    SortBuilder.relog = function (msg) {

        console.log(msg);
    }


    // Muct be called early.
    // this is for hidden html element method method
    SortBuilder.getPrefsx2 = function () {

        SortBuilder.prefparms  = {};

        SortBuilder.prefparms.ApiForDataR = $('#myApiForDataR').val();
        SortBuilder.prefparms.MatchingController = $('#myMatchingController').val();
        SortBuilder.prefparms.paginate = $('#mypaginate').val();
        SortBuilder.prefparms.orderby = $('#myorderby').val();
                    //prefXR2.startpage = $('#mystartpage').val();
        var startpageT = $('#mystartpage').val();
        SortBuilder.prefparms.startpage = parseInt(startpageT);  //0;
                     //prefXR2.pagelength = $('#mypagelength').val();
        var pagelengthT = $('#mypagelength').val();
        SortBuilder.prefparms.pagelength = parseInt(pagelengthT); //10;

                    //prefXR2.pagegroupno = $('#mypagegroupno').val();
        var pagegroupnoT = $('#mypagegroupno').val();
        SortBuilder.prefparms.pagegroupno = parseInt(pagegroupnoT);  //0;
                    //prefXR2.pagegroupsize = $('#mypagegroupsize').val();
        var pagegroupsizeT = $('#mypagegroupsize').val();
        SortBuilder.prefparms.pagegroupsize = parseInt(pagegroupsizeT);  //7;
                    //prefXR2.pageno = $('#mypageno').val();
        var pagenoT = $('#mypageno').val();
        SortBuilder.prefparms.pageno = parseInt(pagenoT);  //0;

        SortBuilder.prefparms.criteria = $('#mycriteria').val();
        SortBuilder.prefparms.pagelinks = $('#mypagelinks').val();
        SortBuilder.prefparms.PostbackPrefix = $('#myPostbackPrefix').val();
        SortBuilder.prefparms.ProjectServerUrl = $('#myProjectServerUrl').val();

        console.log('getPrefsx2: ----------------------------------');

        console.log("getPrefsx2: prefparms.ApiForDataR: " + SortBuilder.prefparms.ApiForDataR);
        console.log('getPrefsx2: ApiForDataR: ' + SortBuilder.prefparms.ApiForDataR);
        console.log('getPrefsx2: paginate: ' + SortBuilder.prefparms.paginate);
        console.log('getPrefsx2: orderby: ' + SortBuilder.prefparms.orderby);
        console.log('getPrefsx2: startpage: ' + SortBuilder.prefparms.startpage);
        console.log('getPrefsx2: pagelength: ' + SortBuilder.prefparms.pagelength);
        console.log('getPrefsx2: pagegroupno: ' + SortBuilder.prefparms.pagegroupno);
        console.log('getPrefsx2: pagegroupsize: ' + SortBuilder.prefparms.pagegroupsize);
        console.log('getPrefsx2: pageno: ' + SortBuilder.prefparms.pageno);
        console.log('getPrefsx2: criteria: ' + SortBuilder.prefparms.criteria);
        console.log('getPrefsx2: pagelinks: ' + SortBuilder.prefparms.pagelinks);
        console.log('getPrefsx2: PostbackPrefix: ' + SortBuilder.prefparms.PostbackPrefix);

        console.log('getPrefsx2: ----------------------------------');

        return;
    }

    // Moved to directive
    //SortBuilder.doSetDefaults();

    // This must be called to initialiaze prefparms
    SortBuilder.getPrefsx2();

    console.log('AuxController: end of controller AuxController');
}]);  // End of SortBuilderController


