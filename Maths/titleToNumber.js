var titleToNumber1 = function (s) {
    var out = 0, power = 1;
    var alph = "@ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    var i = s.length - 1;
    while (i >= 0) {
        var digit = alph.indexOf(s[i]) * power;
        out += digit;
        // console.log(s[i], digit, power, out)
        i--;
        power *= 26
    }
    return out
};

const titleToNumber = s => {
    var out = 0;
    var shift = 'A'.charCodeAt(0) - 1;
    var i = 0;
    while (i < s.length) {
        out = out*26 + s[i].charCodeAt(0) - shift
        i++
    }
    return out
}

var convertToTitle2 = function(n) {
    var div = Math.floor(n/26), rem = n%26;
    if (rem === 0) {rem = 26; div--}
    var capA = 'A'.charCodeAt(0) - 1
    // console.log(n, div, rem)
    if (div === 0) {return String.fromCharCode(capA+rem)}
    return convertToTitle(div)+String.fromCharCode(capA+rem)
};

const convertToTitle = n => {
    let div = Math.floor(n/26), rem = n%26;
    if (rem === 0) {rem = 26; div--}
    let capA = 'A'.charCodeAt(0) - 1
    return (div === 0 ? '' : convertToTitle(div))+String.fromCharCode(capA+rem)
};

const tests = [
    { in: "A", out: 1 },
    { in: "Z", out: 26 },
    { in: "AB", out: 28 },
    { in: "ZY", out: 701 },
    { in: "ZZZ", out: 18278 },
    { in: "JAHDJ", out: 4592858 },
    { in: "FXSHRXV", out: 2147483646 },
    { in: "FXSHRXW", out: 2147483647 }
];
tests.forEach((t, i) => console.log(
    t.in, '->', titleToNumber(t.in), 'should be',
    t.out, '<-', convertToTitle(t.out)
))