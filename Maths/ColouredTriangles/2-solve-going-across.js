const {pairs, reduceRowByRow } = require('./exportFrom');

/*
the idea here is, given a top row of colours 0123456789, calculate
01 -> A = the first colour on the second row 
0123456789
A????????
To work out the first letter on the next row we have to 
combine the 2 with 1 (to get second colour on second row)
0123456789
AB???????
and combine that with A
0123456789
AB???????
C???????
Rather than think in row, i find it easier to model as
0123456789
A123456789 //combine the 2 with the colours before it, finding B along the way
CB23456789

So I need a function that takes a string and a char and 
outputs the string which the next char will combine with
*/

const applyOneToString = (str, c) => {
    var loner = c;
    var nextString = '' + c
    for (var i = str.length - 1; i >= 0; i--) {
        nextString = pairs[str[i] + loner] + nextString;
        loner = pairs[str[i] + loner]
    };
    // console.log(str, c, 'to get', nextString)
    return nextString
}

const triangle = (row) => {
    if (row.length === 1) { return row }
    var left = row[0];
    for (var pointer = 1; pointer < row.length; pointer++) {
        var nextColour = row[pointer];
        left = applyOneToString(left, nextColour);
    }
    return left[0]
}
// note how this method provides the 'diagonals' of below
// R B to get GB
// GB R to get GGR
// GGR G to get BRBG
// BRBG B to get BBGRB
// BBGRB R to get RGRBGR
// RGRBGR B to get GBRRGGB
// GBRRGGB G to get GGRRRBRG
// GGRRRBRG G to get GGGBGBBGG
// GGGBGBBGG R to get RBRBBRGRBR
// RBRBBRGRBR R to get BGRRGRRBGRR
// BGRRGRRBGRR R to get BBRRRBGBBRRR
// BBRRRBGBBRRR B to get RGRRRRGGRGBGB
// RGRRRRGGRGBGB G to get GBRRRRRBRRBBRG
// GBRRRRRBRRBBRG B to get RBBGBGBGRRRGRRB
// RBBGBGBGRRRGRRB B to get BGRGGRBBRRRRBGBB
// BGRGGRBBRRRRBGBB B to get RGGBRBGRGBGBGRBBB
// RGGBRBGRGBGBGRBBB G to get GBRBBGRBGGRBBRRGRG
// GBRBBGRBGGRBBRRGRG G to get GGRRGRBGRBRRGRRRBGG
// RBRGBRBGGRRRBGBBBGG reduces by row to  G

//old method


var tests = [
    'RGRRB', 'RGRGG', 'RGRBR', 'RGGRB', 'RGGGG', 'RGGBR', 'RGBRB', 'RGBGG', 'RGBBR',
    'BRRRG', 'BRRGR', 'BRRBB', 'BRGRG', 'BRGGR', 'BRGBB', 'BRBRG', 'BRBGR', 'BRBBB',
    'BRRRRRRRRG', 'RBRGBRBGGRRRBGBBBGG'
];

tests.forEach(x => console.log(
    x, 'reduces by row to ', reduceRowByRow(x), 'working along top row gets:', triangle(x)
));