/**
 * Created by wfsovereign on 2015/7/7.
 */

function Matrix(n) {
    this.rankNum = n;
}

Matrix.prototype.produceMatrix = function () {
    this.matrix = this._produceRandomMatrix();
    return this.matrix
};

Matrix.prototype._produceRandomMatrix = function () {
    var lineMatrix = [];
    var length = this.rankNum;
    for (var i = 0; i < this.rankNum; i++) {
        lineMatrix.push([])
    }
    _.each(lineMatrix,function(line){
        for (var i = 0; i < length; i++) {
            line[i] = _.random(0,100);
        }
    });
    return lineMatrix
};

Matrix.prototype._calculateHorizontalLineSummary = function () {
    var horizontalLineSummary = [];
    _.each(this.matrix, function (item) {
        horizontalLineSummary.push( _.reduce(item, function (memo, num) {
            return memo + num
        },0))
    });
    return horizontalLineSummary;
};

Matrix.prototype._calculateVerticalLineSummary = function () {
    var verticalLineSummary = this._initVerticalLineSummary(),self = this;
    _.each(this.matrix, function (item) {
        self._calculateVerticalSummaryOfAccumulation(item,verticalLineSummary);
    });
    return verticalLineSummary
};

Matrix.prototype._initVerticalLineSummary = function () {
    var verticalLineSummary = [];
    for(var i = 0 ;i<this.rankNum;i++){
        verticalLineSummary[i]= 0 ;
    }
    return verticalLineSummary
};

Matrix.prototype._calculateVerticalSummaryOfAccumulation = function (item,verticalLineSummary) {
    var length = item.length;
    for(var j = 0 ;j<length;j++){
        verticalLineSummary[j] += item[j] ;
    }
    return verticalLineSummary
};

Matrix.prototype._calculateSlashSummary = function () {
    var slashSummary ;
};

Matrix.prototype.initSlashSummary = function () {
    var slashSummary =[],slashSummaryLength = (this.rankNum-2)*2+1;
    for(var i = 0 ;i<slashSummaryLength;i++){
        slashSummary[i]= 0 ;
    }
    return slashSummary
};

Matrix.prototype._calculateSlashSummaryOfAccumulation = function (item,slashSummary) {
    var length = slashSummary.length;
    for(var j = 0 ;j<length;j++){
        slashSummary[j] += item[j] ;
    }
    return slashSummary

};


var matrix = new Matrix(5);

console.log(matrix.produceMatrix());
console.log(matrix._calculateHorizontalLineSummary());
console.log(matrix._calculateVerticalLineSummary());