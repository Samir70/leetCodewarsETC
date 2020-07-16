// 16+25 = 41 doesn't use the biggest square below 41
const numSquares = n => {
    if (n===0) {return 0}
    var rt = Math.floor(Math.sqrt(n))
    if (n === rt*rt) {return 1}
    // answer can be 2, 3 or 4
    // check for 2
    while (rt*rt >= n/2) {
        var leftOver = n - rt*rt;
        if (leftOver === Math.floor(Math.sqrt(leftOver))**2) {return 2}
        rt--
    }
    // check if we need 4
    var m = n;
    while (m % 4 === 0) {m/=4}
    if (m % 8 === 7) {return 4}
    return 3
}

var tests = [41, 16, 32, 7, 15, 23, 31, 39, 47, 55, 63, 28, 60, 92, 124, 56, 120, 184, 112, 240, 368]

for (var i = 0; i<10; i++) {
    var t = Math.floor(Math.random() * 10000000) + 1;
    tests.push(t)
}

tests.forEach(t => console.log(t, 'needs', numSquares(t), 'squares'));
