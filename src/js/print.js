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


var NS = NS || {};

NS.getGoalMatrixHtml = (function () {
    return function (goalMatrix) {
        var goalMatrixHtml = "";
        _.each(goalMatrix, function (item) {
            goalMatrixHtml += "<tr>";
            for (var i = 0; i < item.length; i++) {
                goalMatrixHtml += "<td>" + item[i] + "</td>"
            }
            goalMatrixHtml += "</tr>";
        });
        return goalMatrixHtml
    }
}());

NS.getGoalArraySummaryHtml = (function () {
    return function (goalArraySummary) {
        var i = 0, goalArraySummaryHtml = "<tr>";
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

    var originalMatrixHtml, transposeMatrixHtml, verticalLineSummaryHtml, horizontalLineSummaryHtml,
        slashSummaryHtml, backSlashSummaryHtml, originalMatrix = matrix.produceMatrix(),
        transposeMatrix = matrix._transposeMatrix(), verticalLineSummary = matrix.getVerticalLineSummary(),
        horizontalLineSummary = matrix.getHorizontalLineSummary(), backSlashSummary = matrix._calculateBackSlashSummary(),
        slashSummary = matrix._calculateSlashSummary();

    originalMatrixHtml = NS.getGoalMatrixHtml(originalMatrix);
    transposeMatrixHtml = NS.getGoalMatrixHtml(transposeMatrix);
    verticalLineSummaryHtml = NS.getGoalArraySummaryHtml(verticalLineSummary);
    horizontalLineSummaryHtml = NS.getGoalArraySummaryHtml(horizontalLineSummary);
    backSlashSummaryHtml = NS.getGoalArraySummaryHtml(backSlashSummary);
    slashSummaryHtml = NS.getGoalArraySummaryHtml(slashSummary);


    return {
        tableMatrix: originalMatrixHtml,
        tableTransposeMatrix: transposeMatrixHtml,
        verticalLineSummaryHtml: verticalLineSummaryHtml,
        horizontalLineSummaryHtml: horizontalLineSummaryHtml,
        backSlashSummaryHtml: backSlashSummaryHtml,
        slashSummaryHtml: slashSummaryHtml

    }

}