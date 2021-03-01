/**
 * deleted any positive number of the same letter from both ends, over and over. 
 * What is length of the string that is left?
 * @param {*} s : string
 */

var minimumLength = function (s) {
    if (s.length === 1) { return 1 }
    let left = 0, right = s.length - 1;
    while (left < right) {
        if (s[left] !== s[right]) {
            return right - left + 1
        }
        let c = s[left]
        while (left < right && s[left] === c) { left++ }
        while (right > left && s[right] === c) {
            right--;
            if (right === left) { return 1 }
        }
    }
    return 0
};

const tests = [
    { s: "ca", out: 2 },
    { s: "a", out: 1 },
    { s: "cabaabac", out: 0 },
    { s: "aabccabba", out: 3 },
    { s: "bbbbbbbbbbbbbbbbbbbbbbbbbbbabbbbbbbbbbbbbbbccbcbcbccbbabbb", out: 1 }
];

tests.forEach((t, i) => console.log(
    'test', i, minimumLength(t.s) === t.out || minimumLength(t.s)
))