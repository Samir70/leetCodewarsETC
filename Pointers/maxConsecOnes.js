const maxConsecOnes = (arr) => {
    const oneStrs = arr.join('').match(/1*/g) || []
    return oneStrs.reduce((acc, v) => v.length > acc ? v.length : acc, 0)
}

const maxWithPointer = (arr) => {
    var oneCount = 0;
    var longest = 0
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == 1) {
            oneCount++
        } else {
            if (oneCount > longest) {longest = oneCount}
            oneCount = 0
        }
    }
    if (oneCount > longest) {longest = oneCount}
    return longest
}

const tests = [
    0, 2134234, 4564567, 324, 534, 3452345, 34534523, 54667, 56756, 23423, 127 * 16 + 7
].map(x => x.toString(2));

tests.forEach(t => {
    console.log(t, 'with join:', maxConsecOnes(t.split('')), 'with pointer:', maxWithPointer(t.split('')))
});
