/**
 * Created by wfsovereign on 15-7-7.
 */





$(function () {
    var tableHtml = printToTable();
    $('.table-matrix').append(tableHtml.tableMatrix);
    $('.table-transpose-matrix').append(tableHtml.tableTransposeMatrix);
    $('.table-verticalLineSummaryHtml').append(tableHtml.verticalLineSummaryHtml);
    $('.table-horizontalLineSummaryHtml').append(tableHtml.horizontalLineSummaryHtml);
    $('.table-backSlashSummaryHtml').append(tableHtml.backSlashSummaryHtml);
    $('.table-slashSummaryHtml').append(tableHtml.slashSummaryHtml);

});



var NS = NS ||{};

NS.getGoalMatrixHtml = (function (){
    return function (goalMatrix){
        var goalMatrixHtml ="";
        _.each(goalMatrix, function (item) {
            goalMatrixHtml += "<tr>";
            for (var i = 0; i < item.length; i++) {
                goalMatrixHtml += "<td>" + item[i] + "</td>"
            }
            goalMatrixHtml += "</tr>";
        });
        return  goalMatrixHtml
    }
}());

NS.getGoalArraySummaryHtml = (function () {
    return function (goalArraySummary) {
        var i = 0,goalArraySummaryHtml = "<tr>";
        _.each(goalArraySummary, function (item) {
            goalArraySummaryHtml += "<td>" + item + "</td>";
            if ((i + 1) % 5 == 0) {
                goalArraySummaryHtml += "<tr></tr>"
            }
            i++;
        });
        return goalArraySummaryHtml
    }
}());


function printToTable() {
    var matrix = new Matrix(5);

    console.log('1', matrix.produceMatrix());
    console.log('2', matrix._transposeMatrix());
    console.log('2', matrix.getHorizontalLineSummary());
    console.log('2', matrix.getVerticalLineSummary());

    var matrixHtml1 = "", matrixHtml2 = "", verticalLineSummaryHtml = "", horizontalLineSummaryHtml = "",
        slashSummaryHtml = "",
        backSlashSummaryHtml = "", matrixResult = matrix.produceMatrix(),
        matrixTranspose = matrix._transposeMatrix(), verticalLineSummary = matrix.getVerticalLineSummary(),
        horizontalLineSummary = matrix.getHorizontalLineSummary(), backSlashSummary = matrix._calculateBackSlashSummary(),
        slashSummary = matrix._calculateSlashSummary();

    //_.each(matrixResult, function (item) {
    //    matrixHtml1 += "<tr>";
    //    for (var i = 0; i < item.length; i++) {
    //        matrixHtml1 += "<td>" + item[i] + "</td>"
    //    }
    //    matrixHtml1 += "</tr>";
    //});
    //
    //_.each(matrixTranspose, function (item) {
    //    matrixHtml2 += "<tr>";
    //    for (var i = 0; i < item.length; i++) {
    //        matrixHtml2 += "<td>" + item[i] + "</td>"
    //    }
    //    matrixHtml2 += "</tr>";
    //});


    matrixHtml1 = NS.getGoalMatrixHtml(matrixResult);
    matrixHtml2 = NS.getGoalMatrixHtml(matrixTranspose);


    verticalLineSummaryHtml = NS.getGoalArraySummaryHtml(verticalLineSummary);
    horizontalLineSummaryHtml = NS.getGoalArraySummaryHtml(horizontalLineSummary);

    //var i = 0;
    //verticalLineSummaryHtml += "<tr>";
    //
    //_.each(verticalLineSummary, function (item) {
    //
    //    verticalLineSummaryHtml += "<td>" + item + "</td>";
    //    if ((i + 1) % 5 == 0) {
    //        verticalLineSummaryHtml += "<tr></tr>"
    //    }
    //    i++;
    //});
    //
    //var j = 0;
    //horizontalLineSummaryHtml = "<tr>";
    //
    //_.each(horizontalLineSummary, function (item) {
    //
    //    horizontalLineSummaryHtml += "<td>" + item + "</td>";
    //
    //    if ((j + 1) % 5 == 0) {
    //        horizontalLineSummaryHtml += "<tr></tr>"
    //    }
    //    j++;
    //});


    backSlashSummaryHtml = NS.getGoalArraySummaryHtml(backSlashSummary);
    slashSummaryHtml = NS.getGoalArraySummaryHtml(slashSummary);

    //var b = 0;
    //backSlashSummaryHtml = "<tr>";
    //
    //_.each(backSlashSummary, function (item) {
    //
    //    backSlashSummaryHtml += "<td>" + item + "</td>";
    //
    //    if ((b + 1) % 5 == 0) {
    //        console.log('111');
    //        backSlashSummaryHtml += "<tr></tr>"
    //    }
    //    b++;
    //});
    //
    //var c = 0;
    //slashSummaryHtml = "<tr>";
    //
    //_.each(slashSummary, function (item) {
    //
    //    slashSummaryHtml += "<td>" + item + "</td>";
    //
    //    if ((c + 1) % 5 == 0) {
    //        console.log('111');
    //        slashSummaryHtml += "<tr></tr>"
    //    }
    //    c++;
    //});

    return {
        tableMatrix: matrixHtml1,
        tableTransposeMatrix: matrixHtml2,
        verticalLineSummaryHtml: verticalLineSummaryHtml,
        horizontalLineSummaryHtml: horizontalLineSummaryHtml,
        backSlashSummaryHtml:backSlashSummaryHtml,
        slashSummaryHtml:slashSummaryHtml

    }

}