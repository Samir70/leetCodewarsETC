var getRow = function(rowIndex) {
    let out = [1], last = 1;
    let top = rowIndex, bottom = 1;
    while (top > 0) {
        last = last*top / bottom;
        out.push(last);
        top--; bottom++
    }
    return out
};

const tests = [
    3, 5, 8, 7
];

tests.forEach(t => console.log(
    t, getRow(t)
))