// fails for 1563847412
var reverseOld = function (x) {
    if (x < 0) { return -reverse(-x) }
    if (x < 10) { return x }
    let digits = ('' + x).length;
    let first = (10 ** (digits - 1)) * (x % 10)
    if (first > 2147483647) { return 0 }
    return first + reverse(Math.floor(x / 10))
};

// 108 ms, faster than 25.18%
const reverse = x => {
    if (x < 0) { return -reverse(-x) }
    if (x < 10) { return x }
    let out = 0;
    while (x > 0) {
        let digit = x % 10;
        x = Math.floor(x / 10);
        out = 10 * out + digit;
        if (out > 2147483647) { return 0 }
    }
    return out
}

const tests = [
    { in: 1563847412, out: 0 }, //since overflow 2,147,483,647 
    { in: 120, out: 21 },
    { in: -123, out: -321 }
];

tests.forEach((t, i) => console.log(
    'test', i, reverse(t.in) === t.out
))