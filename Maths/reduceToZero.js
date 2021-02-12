// reduce num to zero by halfing or decrement
// 92ms; 22%
var numberOfSteps  = function(num) {
    // console.log(num, Math.log2(num), num.toString(2));
    let numRightShifts = num === 0 ? 0 : Math.floor(Math.log2(num));
    let numMinusOnes = 0;
    while (num) {
        numMinusOnes++;
        num = num & (num - 1)
    }
    return numRightShifts + numMinusOnes
};

// 76ms; 87%
var numberOfSteps  = function(num) {
    let count = 0;
    while (num) {
        num = num % 2 ? num - 1 : num / 2
        count++
    }
    return count
};