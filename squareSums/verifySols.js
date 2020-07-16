const { bigTests, testsOf35, path33, squarePathsResults, startWithPath15, shortPaths, fromHeadStart } = require('./tests');
var squares = [...Array(50)].map((x, i) => i * i);
// console.log(squares.join());

const sumPairs = (arr) => arr.slice(1).map((x, i) => x + arr[i]);

const verify = (arr) => {
    // all numbers included
    var allNumbers = [...arr].sort((a, b) => a - b).filter((x, i) => x === i + 1).length === arr.length;
    var nonSquare = sumPairs(arr).map(x => squares.indexOf(x)).indexOf(-1)
    return {
        allNumber: allNumbers ? 'All numbers were used' : 'ERROR:::Some numbers missed or reused',
        sumsTest: nonSquare === -1 ?
            'All sums are squares' :
            'ERROR::: ' + arr[nonSquare] + ' + ' + arr[nonSquare + 1] + ' =/= square'
    }
}

var tests = [
    [6, 7, 4, 3, 2, 8, 9, 1],
    [1, 3, 2, 3, 4],
    [16, 9, 7, 2, 14, 11, 5, 4, 12, 13, 3, 6, 10, 15, 1, 8, 17],
    [9, 7, 2, 14, 11, 5, 4, 12, 13, 3, 6, 10, 15, 1, 8],
    [8, 1, 15, 10, 6, 3, 13, 12, 4, 5, 11, 14, 2, 7, 9], // 15
    [8, 1, 15, 10, 6, 3, 13, 12, 4, 5, 11, 14, 2, 7, 9, 16], // 16
    [16, 9, 7, 2, 14, 11, 5, 4, 12, 13, 3, 6, 10, 15, 1, 8, 17], // 17
    [18, 7, 2, 23, 13, 12, 4, 21, 15, 10, 6, 19, 17, 8, 1, 3, 22, 14, 11, 5, 20, 16, 9], // 23
    [18, 7, 9, 16, 20, 5, 11, 14, 2, 23, 13, 12, 4, 21, 15, 10, 6, 19, 17, 8, 1, 3, 22], // another 23
    [18, 7, 2, 23, 13, 12, 24, 25, 11, 14, 22, 3, 1, 8, 17, 19, 6, 10, 15, 21, 4, 5, 20, 16, 9], // 25
    [18, 7, 9, 16, 20, 5, 11, 25, 24, 12, 4, 21, 15, 10, 6, 19, 17, 8, 1, 3, 22, 14, 2, 23, 13], // another 25
    [18, 7, 2, 14, 22, 3, 13, 23, 26, 10, 6, 19, 17, 8, 1, 15, 21, 4, 12, 24, 25, 11, 5, 20, 16, 9], // 26
    [18, 7, 2, 14, 11, 5, 20, 16, 9, 27, 22, 3, 13, 23, 26, 10, 6, 19, 17, 8, 1, 15, 21, 4, 12, 24, 25], // 27
    [18, 7, 2, 14, 11, 5, 20, 16, 9, 27, 22, 3, 6, 19, 17, 8, 28, 21, 4, 12, 13, 23, 26, 10, 15, 1, 24, 25], // 28
    [18, 7, 29, 20, 16, 9, 27, 22, 3, 13, 12, 4, 5, 11, 14, 2, 23, 26, 10, 6, 19, 17, 8, 28, 21, 15, 1, 24, 25], // 29
    [18, 7, 29, 20, 16, 9, 27, 22, 3, 13, 12, 4, 5, 11, 14, 2, 23, 26, 10, 6, 30, 19, 17, 8, 28, 21, 15, 1, 24, 25], // 30
    [31, 18, 7, 29, 20, 16, 9, 27, 22, 3, 13, 12, 4, 5, 11, 14, 2, 23, 26, 10, 6, 30, 19, 17, 8, 28, 21, 15, 1, 24, 25], // 31
    [32, 4, 5, 11, 25, 24, 12, 13, 3, 1, 15, 21, 28, 8, 17, 19, 30, 6, 10, 26, 23, 2, 14, 22, 27, 9, 16, 20, 29, 7, 18, 31], // 32
    [33, 3, 6, 30, 19, 17, 32, 4, 12, 13, 23, 2, 14, 22, 27, 9, 16, 20, 29, 7, 18, 31, 5, 11, 25, 24, 1, 8, 28, 21, 15, 10, 26], // 33
    // by hand, finding a loop and joining segments
    [ // 34
        1, 8, 28, 21, 15, 10, 6, 3, 33, 31, 18, 7,
        29, 20, 16, 9, 27, 22, 14, 2, 34, 30, 19, 17,
        32, 4, 5, 11, 25, 24, 12, 13, 23, 26
    ],
    [ // 34 via followRoadMap
        29, 20, 5, 4, 32, 17, 19, 30, 34, 15, 21, 28, 8, 1, 
        24, 25, 11, 14, 22, 27, 9, 16, 33, 31, 18, 7, 2, 23, 
        26, 10, 6, 3, 13, 12
    ],
    // by hand, loop again useful but mostly by starting with essential pairs
    [ //35
        33, 3, 13, 12, 4, 32, 17, 19, 30, 6, 10, 26, 23, 2, 34, 15, 21, 28, 8, 1, 35, 14, 22, 27,
        9, 16, 20, 29, 7, 18, 31, 5, 11, 25, 24
    ]
];

const tally = (arr) => {
    var t = {}
    arr.forEach(val => {
        if (t[val]) {
            t[val]++
        } else { t[val] = 1 }
    });
    var sumSquares = 0;
    for (s in t) {
        sumSquares += s*t[s]
    }
    t.sumOfSquares = sumSquares;
    return t
}

// tests.forEach(a => {
//     console.log('solution for ', a.length);
//     //console.log(a.join(', '))
//     //console.log('The squares targeted:', sumPairs(a).join())
//     console.log(tally(sumPairs(a)), verify(a));
// });

// for (var i in startWithPath15) {console.log(i, verify(startWithPath15[i]))}
// for (var i in fromHeadStart) {console.log(i, verify(fromHeadStart[i]))}

// console.log(verify(shortPaths[67]))

module.exports = { sumPairs, verify, tally }