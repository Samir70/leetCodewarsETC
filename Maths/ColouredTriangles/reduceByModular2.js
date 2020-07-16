// Trying to reduce by modular arithmatic, using patterns I noticed from collect by results
const { pairs, colourDigits, colourLetters, sumMod3 } = require('./exportFrom');
const { whichToAdd } = require('./LucasCoeffs')
const goodLengths = [7, 19, 55, 163, 487, 1459, 4375, 13123, 39367, 118099];
// these were easy to calculate because we would only have to add together the 
// characters of row with index [0, (len - 1) / 2, (len - 1) / 2, len - 1]
// But still too slow.
// The aim now is to do the same, but instead of choosing a goodLength
// choose the biggest number less than row.length that is 1 mod 6



const reduceByModular = (row, wta) => {
    var digits = [...row].map(x => Number(colourDigits[x]));
    let len = row.length;
    switch (len) {
        case 1: { return row }
        case 2: { return pairs[row] }
        case 3: {
            return sumMod3(digits, [0, 1, 1, 2]) // 1, 2, 1
            // second line of Pascal's triangle mode 3
        }
        case 4: {
            return sumMod3(digits, [0, 0, 3, 3]) // 2, 0, 0, 2
        }
        case 5: {
            return sumMod3(digits, [0, 1, 3, 4]) // 1, 1, 0, 1, 1
            // reduced from 1, 4, 6, 4, 1 times the digits in those positions
            // maybe something to do with Pascal's triangle? No, fails for next.
        }
        case 6: {
            return sumMod3(digits, [0, 0, 1, 2, 2, 3, 3, 4, 5, 5])
            // 1, 5, 10, 10, 5, 1 === 
        }
        // for 7+, 
        default: {
            return sumMod3(digits, wta)
        }
    }
}

const triangle = (row) => {
    const len = row.length;
    console.log(len);
    if (len < 7) { return reduceByModular(row) }
    var bestLength = 7;
    goodLengths.forEach(x => { if (x <= len) { bestLength = x } } );
    // if we get something we can work out in one go, great
    if (bestLength === len) { return reduceByModular(row, whichToAdd(bestLength)) }
    // otherwise, the bestLength should be 1 mod 6, but <= row.length
    bestLength = len;
    while ((bestLength % 6) !== 1) {bestLength--}
    // We might still be able to do this in one go
    if (bestLength === len) { return reduceByModular(row, whichToAdd(bestLength)) }
    // otherwise: we have far fewer iterations of below
    var nextRow = '';
    var wta = whichToAdd(bestLength);
    for (var i = 0; i+bestLength<=len; i++) {
        var segment = row.slice(i, i+bestLength);
        nextRow += reduceByModular(segment, wta);
    }
    return triangle(nextRow)
}


/*
Words of length 3 matched.
For words of length 19: Tried all 1594323 found  1594323 answers that matched.
tested random 10 for 487
*/

module.exports = { reduceByModular, triangle }

/*
** Old experiments:
if (row.length === 7) {
        return sumMod3(digits, [0, 3, 3, 6]) //
        // and 6th line of Pascal's triangle is
        // 1, 6, 15, 20, 15, 6, 1 === 1, 0, 0, 2, 0, 0, 1 mod 3
    }
    if (row.length === 13) {
        return sumMod3(digits, [0, 3, 9, 12]);
        // 12th line of Pascal's triangle:
        // 1, 0, 0, 1, 0, 0,    0,   0, 0, 1, 0, 0, 1
    }
    if (row.length === 19) {
        return sumMod3(digits, [0, 9, 9, 18]);
        // 18th line of PT
        // 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, ..., 1
        // This works because 18!/(18-n)!n!
        // for n>1 we have 18 on top of fraction, so bottom needs at least 2 threes amongst factors
    }
    if (row.length === 55) {
        return sumMod3(digits, [0, 27, 27, 54] )
        // Via Lucas’ theorem on binomial coefficients modulo a prime
        // and Bin(54, n) == 0 except when n = 0, 54 and 27
    }
*/