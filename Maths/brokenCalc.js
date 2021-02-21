const brokenCalc = (a, b) => {
    let stage1 = 0;
    while (a < b) {
        stage1++;
        if (b % 2) {
            b++
        } else {
            b /= 2
        }
    }
    return stage1 + a - b
}

//faster:
var brokenCalc = function(x, y) {
    if (x >= y) {return x - y}
    if (y % 2 === 0) {
        return brokenCalc(x, y/2) + 1
    }
    return brokenCalc(x, y+1) + 1
};