var titleToNumber = function (s) {
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

const tests = [
    { in: "A", out: 1 },
    { in: "AB", out: 28 },
    { in: "ZY", out: 701 },
    { in: "ZZZ", out: 18278 },
    { in: "JAHDJ", out: 4592858 },
    { in: "FXSHRXV", out: 2147483646 },
    { in: "FXSHRXW", out: 2147483647 }
];
tests.forEach((t, i) => console.log(
    t.in, '->', titleToNumber(t.in), 'should be', t.out
))