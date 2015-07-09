/**
 * Created by wfsovereign on 2015/7/7.
 */

function Matrix(n) {
    this.rankNum = n;
    this.maxRandomNum = 10;
    this.minRandomNum = 0;
}

Matrix.prototype.produceMatrix = function () {
    this.matrix = this._produceRandomMatrix();
    return this.matrix
};

Matrix.prototype._produceRandomMatrix = function () {
    var lineMatrix = [],maxRandomNum = this.maxRandomNum,minRandomNum = this.minRandomNum;
    var length = this.rankNum;
    for (var i = 0; i < this.rankNum; i++) {
        lineMatrix.push([])
    }
    _.each(lineMatrix, function (line) {
        for (var i = 0; i < length; i++) {
            line[i] = _.random(minRandomNum, maxRandomNum);
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


Matrix.prototype.getSlashSummary = function () {
    var slashSummary = [], rankNum = this.rankNum, a = this.matrix;
    for (var k = 2; k < rankNum; k++) {
        for (var i = 0; i < rankNum - 2; i++) {
            slashSummary.push(a[k][i] + a[k - 1][i + 1] + a[k - 2][i + 2])
        }
    }
    return slashSummary
};



Matrix.prototype.getBackSlashSummary = function () {
    var backSlashSummary = [], rankNum = this.rankNum, a = this.matrix;
    for (var k = 0; k < rankNum - 2; k++) {
        for (var i = rankNum - 3; i >= 0; i--) {
            backSlashSummary.push(a[k][i] + a[k + 1][i + 1] + a[k + 2][i + 2])
        }
    }
    return backSlashSummary
};


Matrix.prototype.getMaxValue = function () {
    var slashSummaryArray = this.getBackSlashSummary(), backSlashSummaryArray = this.getBackSlashSummary(),
        verticalLineSummaryArray = this.getVerticalLineSummary(),
        horizontalLineSummary = this.getHorizontalLineSummary();
    var maxSummaryArray = (_.sortBy(_.union(slashSummaryArray, backSlashSummaryArray, verticalLineSummaryArray, horizontalLineSummary)));
    var goalLength = maxSummaryArray.length;
    return maxSummaryArray[goalLength-1]
};



