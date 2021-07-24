// valid chars are 0, 10, 11
// does bits end in one char character?

// don't need to parse whole array
// 76ms beats 76%
var isOneBitCharacter = function(bits) {
    let ones = 0;
    for (let i = bits.length - 2; i >= 0 && bits[i] === 1; i--) {ones++}
    return ones % 2 === 0
};

// parsing whole array:
// 80ms beats nearly 55%
var isOneBitCharacter = function(bits) {
    let i = 0, char = '1bit'
    while (i < bits.length) {
        char = bits[i] === 0 ? '1bit' : '2bit'
        i += bits[i] === 0 ? 1 : 2
    }
    return char === '1bit'
};