/**
 * Created by wfsovereign on 15-7-7.
 */





$(function (){
    var tableHtml = printToTable();
    $('.table-matrix').append(tableHtml.tableMatrix);
    $('.table-transpose-matrix').append(tableHtml.tableTransposeMatrix);
});


function printToTable() {
    var matrix = new Matrix(5);

    console.log('1', matrix.produceMatrix());
    console.log('2', matrix._calculateHorizontalLineSummary());
    console.log('3', matrix._calculateVerticalLineSummary());

    var matrixHtml1 = "",matrixHtml2 = "", matrixResult = matrix.produceMatrix(),matrixTranspose = matrix._transposeMatrix();
    _.each(matrixResult, function (item) {
        matrixHtml1 +="<tr>";
        for (var i = 0; i < item.length; i++) {
            matrixHtml1 += "<td>"+item[i]+"</td>"
        }
        matrixHtml1 +="</tr>";
    });

    _.each(matrixTranspose, function (item) {
        matrixHtml2 +="<tr>";
        for (var i = 0; i < item.length; i++) {
            matrixHtml2 += "<td>"+item[i]+"</td>"
        }
        matrixHtml2 +="</tr>";
    });


    return {
        tableMatrix:matrixHtml1,
        tableTransposeMatrix:matrixHtml2

    }

}