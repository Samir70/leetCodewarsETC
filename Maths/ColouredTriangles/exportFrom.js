const pairs = {
    GG: 'G', RR: 'R', BB: 'B', RG: 'B', GR: 'B', GB: 'R', BG: 'R', BR: 'G', RB: 'G'
}

const reduceRowByRow = (row, resultLength = 1) => {
    if (row.length === resultLength) { return row }
    var newRow = '';
    for (var i = 0; i < row.length - 1; i++) {
        newRow += pairs[row[i] + row[i + 1]]
    }
    // console.log(row, '-->', newRow);
    return reduceRowByRow(newRow, resultLength);
}
// RBRGBRBGGRRRBGBBBGG --> GGBRGGRGBRRGRRBBRG
//  GGBRGGRGBRRGRRBBRG --> GRGBGBBRGRBBRGBGB
//   GRGBGBBRGRBBRGBGB --> BBRRRBGBBGBGBRRR
//    BBRRRBGBBGBGBRRR --> BGRRGRRBRRRRGRR
//     BGRRGRRBRRRRGRR --> RBRBBRGGRRRBBR
//      RBRBBRGGRRRBBR --> GGGBGBGBRRGBG
//       GGGBGBGBRRGBG --> GGRRRRRGRBRR
//        GGRRRRRGRBRR --> GBRRRRBBGGR
//         GBRRRRBBGGR --> RGRRRGBRGB
//          RGRRRGBRGB --> BBRRBRGBR
//           BBRRBRGBR --> BGRGGBRG
//            BGRGGBRG --> RBBGRGB
//             RBBGRGB --> GBRBBR
//              GBRBBR --> RGGBG
//               RGGBG --> BGRR
//                BGRR --> RBR
//                 RBR --> GG
//                  GG --> G
// RBRGBRBGGRRRBGBBBGG reduces by row to  G

const makeRandomRow = (n) =>
    [...Array(n)].map(x => ['R', 'G', 'B'][Math.floor(Math.random() * 3)]).join('');

const colourDigits = {
    R: '0', G: '1', B: '2'
}
const colourLetters = ['R', 'G', 'B'];
const rgbToDecimal = (rgb) => {
    var numStr = [...rgb].map(x => colourDigits[x]).join('');
    return parseInt(numStr, 3);
}
const makeWords = (wordLength) => {
    var words = []
    for (var i = 0; i < 3 ** wordLength; i++) {
        var base3 = i.toString(3);
        while (base3.length < wordLength) { base3 = '0' + base3 }
        base3 = [...base3].map(x => x === '0' ? 'R' : x === '1' ? 'G' : 'B').join('');
        words.push(base3)
    }
    return words
}

// add indicated elements together, giving answer mod 3
const sumMod3 = (numArray, elementsToAdd) => {
    var total = elementsToAdd.reduce((acc, v) => acc + numArray[v], 0);
    return colourLetters[total % 3];
}

module.exports = {
    pairs, reduceRowByRow, makeRandomRow,
    colourDigits, colourLetters, rgbToDecimal, makeWords,
    sumMod3
}