// start SortClauseBuilderComponent

function makehdrow(maxcols) {
    var rowstring = '<tr><th class="scbc-th" >Order</th>';

    for (ii = 1; ii <= maxcols; ii++) {
        rowstring += '<th class="scbc-th order" data-halign="center" data-align="center">' + ii + '</th>';
    }
    rowstring += '<th class="scbc-th" data-halign="center" data-align="center">N/A</th>';
    rowstring += '<th class="scbc-th" data-halign="center" data-align="center">Desc</th></tr>';
    return rowstring;
}

function maketrrow(keycol, rowname, maxcols) {

    var rowstring = '<tr><td class="scbc-td" >' + keycol + '</td>';

    // These have a value that indicates sort level.
    for (ii = 1; ii <= maxcols; ii++) {
        rowstring += '<td class="scbc-td" ><input class="scbc-radio" type="radio" name="' + rowname + '" id="rb' + rowname + ii + '"  value="' + ii + '"  ng-click="checkStuff($event)"/></td>';
    }

    // The following one is for the last radio, which is for exclude and has a value of 0.

    rowstring += '<td class="scbc-td" ><input class="scbc-radio" type="radio" name="' + rowname + '" id="rb' + rowname + 0 + '" value="0" checked   ng-click=\"checkStuff($event)\"/></td>';
    rowstring += '<td class="scbc-td" ><input class="scbc-check" type="checkbox" name="cb' + rowname + '" id="cb' + rowname + '"  value="0"   ng-click="checkStuff($event)"/></td>';
    rowstring += '</tr>';
    //console.log('rowstring: ' + rowstring);
    return rowstring;

}

function makesortpick(keycolarr, pickername, maxcols) {

    var rowname = '';
    var tabstring = '<table id="tab' + pickername + '" class="scbc-table" name="' + pickername + '">' + makehdrow(maxcols);
    $.each(keycolarr, function (index, value) {

        tabstring += maketrrow(value, 'row' + value, maxcols);
    });

    return tabstring + '</table>';
}

// end SortClauseBuilderComponent