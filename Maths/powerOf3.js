var isPowerOfThree = function(n) {
    let x = Math.log(n) / Math.log(3)
    // console.log(Math.abs(x - Math.round(x)))
    // console.log(x)
    return Math.abs(x - Math.round(x)) < 0.0000000001
};

var isPowerOfThree = function(n) {
    if (n <= 0 ) {return false}
    let pow = 1
    while (pow <= n) {
        if (pow === n) {return true}
        pow *= 3
    }
    return false
};

const isPowerOfThree = n => n === 1 ? true : n > 1 ? isPowerOfThree(n/3) : false

var isPowerOfThree = function(n) {
    return n > 0 && 1162261467 % n === 0
};
