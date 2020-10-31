// This passed in LeetCode, so could be used to test other languages.
const pairs = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I']
]
var intToRoman = function(num) {
    let out = '';
    for (let p of pairs) {
        while (num >= p[0]) {
            out += p[1];
            num -= p[0]
        }
    }
    return out
};

var romanToInt = function(s) {
    let num = 0
    while (s !== '') {
        for (let pair of pairs) {
            while (s.startsWith(pair[1])) {
                s = s.slice(pair[1].length);
                num += pair[0]
            } 
        }
    }
    return num
};

let num = 10099;
console.log(num, romanToInt(intToRoman(num)))
