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
    _.each(lineMatrix, function (line) {
        for (var i = 0; i < length; i++) {
            line[i] = _.random(0, 10);
        }
    });
    return lineMatrix
};

Matrix.prototype._calculateHorizontalLineSummary = function (matrix, resultMatrix) {
    var rankNum = this.rankNum;
    _.each(matrix, function (item) {
        for (var i = 0; i < rankNum - 2; i++) {
            resultMatrix.push((item[i] + item[i + 1] + item[i + 2]));
        }
    });
};

Matrix.prototype.getHorizontalLineSummary = function () {
    //var horizontalLineSummary = this._initHorizontalLineSummary();
    var horizontalLineSummary = [];
    this._calculateHorizontalLineSummary(this.matrix, horizontalLineSummary);

    return horizontalLineSummary
};

Matrix.prototype._transposeMatrix = function () {
    var transposeMatrix = this._initTransposeMatrix(), rankNum = this.rankNum;
    _.each(this.matrix, function (item) {
        for (var i = 0; i < rankNum; i++) {
            transposeMatrix[i].push(item[i]);
        }
    });
    return transposeMatrix
};

Matrix.prototype._initTransposeMatrix = function () {
    var transposeMatrix = [];
    for (var i = 0; i < this.rankNum; i++) {
        transposeMatrix[i] = [];
    }
    return transposeMatrix
};


Matrix.prototype.getVerticalLineSummary = function () {
    //var verticalLineSummary = this._initHorizontalLineSummary();
    var verticalLineSummary = [];
    this._calculateHorizontalLineSummary(this._transposeMatrix(this.matrix), verticalLineSummary);
    return verticalLineSummary

};


Matrix.prototype._initHorizontalLineSummary = function () {
    var horizontalLineSummary = [];
    for (var i = 0; i < (this.rankNum - 2) * this.rankNum; i++) {
        horizontalLineSummary[i] = 0;
    }
    return horizontalLineSummary
};


Matrix.prototype._calculateSlashSummary = function () {
    var slashSummary = [], rankNum = this.rankNum,a = this.matrix;
    for (var k = 2; k < rankNum; k++) {
        for (var i = 0; i < rankNum-2; i++) {
            slashSummary.push(a[k][i]+a[k-1][i+1]+a[k-2][i+2])
        }
    }
    console.log(slashSummary,"0=0------=");
    return slashSummary
};

// not use
Matrix.prototype._initSlashSummary = function () {
    var slashSummary = [], slashSummaryLength = this.rankNum;
    for (var i = 0; i < slashSummaryLength; i++) {
        slashSummary[i] = [];
    }
    return slashSummary
};


Matrix.prototype._calculateBackSlashSummary = function () {
    var backSlashSummary = [], rankNum = this.rankNum,a = this.matrix;
    for (var k = 0; k < rankNum-2; k++) {
        for (var i = rankNum - 3; i >= 0; i--) {
            backSlashSummary.push(a[k][i]+a[k+1][i+1]+a[k+2][i+2])
        }
    }
    console.log(backSlashSummary,"0=0=");
    return backSlashSummary
};



//Matrix.prototype._calculateSlashSummaryOfAccumulation = function (item, slashSummary) {
//    var length = slashSummary.length;
//    for (var j = 0; j < length; j++) {
//        slashSummary[j] += item[j];
//    }
//    return slashSummary
//
//};

