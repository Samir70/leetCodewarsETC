var addBinary1 = function (a, b) {
    var i = a.length - 1;
    var j = b.length - 1;
    var out = '', carry = '0';
    const sumOf3 = {
        '000': '00',
        '001': '01',
        '010': '01',
        '011': '10',
        '100': '01',
        '101': '10',
        '110': '10',
        '111': '11',
    }
    while (i >=0 || j >=0) {
        var digitA = a[i] === undefined ? '0' : a[i]
        var digitB = b[j] === undefined ? '0' : b[j]
        var sum = sumOf3[digitA+digitB+carry]
        carry = sum[0];
        out = sum[1] + out
        i--; j--;
    }
    if (carry === '1') { out = carry + out }
    return out
};

var addBinary = function (a, b) {
    var i = a.length - 1;
    var j = b.length - 1;
    var out = '', carry = '0';
    const sumDigits = (x, y, c) => {
        let m = x === undefined ? 0 : Number(x)
        let n = y === undefined ? 0 : Number(y)
        return ['00', '01', '10', '11'][m+n+Number(c)]
    }
    while (i >=0 || j >=0) {
        var sum = sumDigits(a[i], b[j], carry)
        carry = sum[0];
        out = sum[1] + out
        i--; j--;
    }
    if (carry === '1') { out = carry + out }
    return out
};

const tests = [
    { a: "11", b: "1", out: "100" },
    { a: "1101101101", b: "0", out: "1101101101" },
    { a: "0", b: "0", out: "0" },
    { a: "1010", b: "1011", out: "10101" },
    { a: "101110110111011111111111101111111100", b: "10011000000011000000000000000011111111", out: "11000110111010011111111111110011111011" }
];

tests.forEach((t, i) => console.log(
    'test', i, addBinary(t.a, t.b) === t.out
))