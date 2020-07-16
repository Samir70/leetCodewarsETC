const pairs = {
    GG: 'G', RR: 'R', BB: 'B', RG: 'B', GR: 'B', GB: 'R', BG: 'R', BR: 'G', RB: 'G'
}
const reduceRowTo = (row, resultLength) => {
    if (row.length === resultLength) { return row }
    var newRow = '';
    for (var i = 0; i < row.length - 1; i++) {
        newRow += pairs[row[i] + row[i + 1]]
    }
    // console.log(row, '-->', newRow);
    return reduceRowTo(newRow, resultLength);
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

// console.log(makeWords(3).join(', '));

var resultAfterReduce = {
    R: [],
    G: [],
    B: []
}

const collectResults = (maxLength) => {
    var len = 2;
    while (len <= maxLength) {
        var words = makeWords(len);
        words.forEach(row => {
            result = reduceRowTo(row, len - 1);
            if (resultAfterReduce[result]) {
                resultAfterReduce[result].push(row)
            } else { resultAfterReduce[result] = [row] }
        });
        len++
    }
}

// collectResults(4);
// for (var result in resultAfterReduce) {
//     // batch in rows of 9
//     var batched = [resultAfterReduce[result].splice(0, 3)];
//     while (resultAfterReduce[result].length > 9) { batched.push(resultAfterReduce[result].splice(0, 9)) }
//     batched.forEach(arr => console.log('each of [', arr.join(', '), '] reduces to ', result))
// }

const Decimalise = (rgb) => {
    var numStr = [...rgb].map(x => x==='R' ? '0' : x === 'G' ? '1' : '2').join('');
    return parseInt(numStr, 3);
}
const findToHitTargets = (targets = ['R'], wordLength) => {
    var starters = [];
    targets.forEach(t => {
        var len = t.length;
        var words = makeWords(wordLength);
        words.forEach(w => {
            result = reduceRowTo(w, len);
            if (result === t) {
                starters.push(w+'='+Decimalise(w))
            }
        })
    });
    return starters;
}

console.log(findToHitTargets(['R'], 8).join(', '))

/*
each of [ RR, GB, BG ] (0, 5, 7) reduces to  R = 0
each of [ RRR, GBG, BGB ] (0, 16, 23) reduces to  RR = 0
each of [ RBB, GGR, BRG ] (8, 12, 19) reduces to  GB = 5
each of [ RGG, GRB, BBR ] (4, 11, 24) reduces to  BG = 7
[   'RRRR','GBGB','BGBG',
    'RBBR','GGRB','BRGG',
    'RGGR','GRBB','BBRG' ] 'reduce to one of' [ 'RRR', 'GBG', 'BGB' ]
[   'RRGR','GBBB','BGRG',
    'RBRR','GGGB','BRBG',
    'RGBR','GRRB','BBGG' ] 'reduce to one of' [ 'RBB', 'GGR', 'BRG' ]
[   'RRBR','GBRB','BGGG',
    'RBGR','GGBB','BRRG',
    'RGRR','GRGB','BBBG' ] 'reduce to one of' [ 'RGG', 'GRB', 'BBR' ]
*/
// So all the fours that reduce to R:
const foursToRed = [
    'RRRR', 'RRGR', 'RRBR', 'RGRR', 'RGGR', 'RGBR', 'RBRR', 'RBGR', 'RBBR',
    'GRRB', 'GRGB', 'GRBB', 'GGRB', 'GGGB', 'GGBB', 'GBRB', 'GBGB', 'GBBB',
    'BRRG', 'BRGG', 'BRBG', 'BGRG', 'BGGG', 'BGBG', 'BBRG', 'BBGG', 'BBBG'
];
/* As decimal numbers:
[   0,3,6,9,12,15,18,21,24,
    29,32,35,38,41,44,47,50,53,
    55,58,61,64,67,70,73,76,79 ];
*/
// All the fives that reduce to R:
const fivesToRed = [
    'RRRRR', 'RRRGB', 'RRRBG', 'RRGRR', 'RRGGB', 'RRGBG', 'RRBRR', 'RRBGB', 'RRBBG',
    'RGRRB', 'RGRGG', 'RGRBR', 'RGGRB', 'RGGGG', 'RGGBR', 'RGBRB', 'RGBGG', 'RGBBR',
    'RBRRG', 'RBRGR', 'RBRBB', 'RBGRG', 'RBGGR', 'RBGBB', 'RBBRG', 'RBBGR', 'RBBBB',
    'GRRRB', 'GRRGG', 'GRRBR', 'GRGRB', 'GRGGG', 'GRGBR', 'GRBRB', 'GRBGG', 'GRBBR',
    'GGRRG', 'GGRGR', 'GGRBB', 'GGGRG', 'GGGGR', 'GGGBB', 'GGBRG', 'GGBGR', 'GGBBB',
    'GBRRR', 'GBRGB', 'GBRBG', 'GBGRR', 'GBGGB', 'GBGBG', 'GBBRR', 'GBBGB', 'GBBBG',
    'BRRRG', 'BRRGR', 'BRRBB', 'BRGRG', 'BRGGR', 'BRGBB', 'BRBRG', 'BRBGR', 'BRBBB',
    'BGRRR', 'BGRGB', 'BGRBG', 'BGGRR', 'BGGGB', 'BGGBG', 'BGBRR', 'BGBGB', 'BGBBG',
    'BBRRB', 'BBRGG', 'BBRBR', 'BBGRB', 'BBGGG', 'BBGBR', 'BBBRB', 'BBBGG', 'BBBBR'
];
/* As decimal numbers:
    0,5,7,9,14,16,18,23,25,
    29,31,33,38,40,42,47,49,51,
    55,57,62,64,66,71,73,75,80,
    83,85,87,92,94,96,101,103,105,
    109,111,116,118,120,125,127,129,134,
    135,140,142,144,149,151,153,158,160,
    163,165,170,172,174,179,181,183,188,
    189,194,196,198,203,205,207,212,214,
    218,220,222,227,229,231,236,238,240 ]
*/

/* six letter word that reduce to R
    RRRRRR=0, RRRRGG=4, RRRRBB=8, RRRGRB=11, RRRGGR=12, RRRGBG=16, RRRBRG=19, RRRBGB=23, RRRBBR=24, 
    RRGRRB=29, RRGRGR=30, RRGRBG=34, RRGGRG=37, RRGGGB=41, RRGGBR=42, RRGBRR=45, RRGBGG=49, RRGBBB=53, 
    RRBRRG=55, RRBRGB=59, RRBRBR=60, RRBGRR=63, RRBGGG=67, RRBGBB=71, RRBBRB=74, RRBBGR=75, RRBBBG=79, 
    RGRRRG=82, RGRRGB=86, RGRRBR=87, RGRGRR=90, RGRGGG=94, RGRGBB=98, RGRBRB=101, RGRBGR=102, RGRBBG=106, 
    RGGRRR=108, RGGRGG=112, RGGRBB=116, RGGGRB=119, RGGGGR=120, RGGGBG=124, RGGBRG=127, RGGBGB=131, RGGBBR=132, 
    RGBRRB=137, RGBRGR=138, RGBRBG=142, RGBGRG=145, RGBGGB=149, RGBGBR=150, RGBBRR=153, RGBBGG=157, RGBBBB=161, 
    RBRRRB=164, RBRRGR=165, RBRRBG=169, RBRGRG=172, RBRGGB=176, RBRGBR=177, RBRBRR=180, RBRBGG=184, RBRBBB=188, 
    RBGRRG=190, RBGRGB=194, RBGRBR=195, RBGGRR=198, RBGGGG=202, RBGGBB=206, RBGBRB=209, RBGBGR=210, RBGBBG=214, 
    RBBRRR=216, RBBRGG=220, RBBRBB=224, RBBGRB=227, RBBGGR=228, RBBGBG=232, RBBBRG=235, RBBBGB=239, RBBBBR=240, 
    GRRRRB=245, GRRRGR=246, GRRRBG=250, GRRGRG=253, GRRGGB=257, GRRGBR=258, GRRBRR=261, GRRBGG=265, GRRBBB=269, 
    GRGRRG=271, GRGRGB=275, GRGRBR=276, GRGGRR=279, GRGGGG=283, GRGGBB=287, GRGBRB=290, GRGBGR=291, GRGBBG=295, 
    GRBRRR=297, GRBRGG=301, GRBRBB=305, GRBGRB=308, GRBGGR=309, GRBGBG=313, GRBBRG=316, GRBBGB=320, GRBBBR=321, 
    GGRRRR=324, GGRRGG=328, GGRRBB=332, GGRGRB=335, GGRGGR=336, GGRGBG=340, GGRBRG=343, GGRBGB=347, GGRBBR=348, 
    GGGRRB=353, GGGRGR=354, GGGRBG=358, GGGGRG=361, GGGGGB=365, GGGGBR=366, GGGBRR=369, GGGBGG=373, GGGBBB=377, 
    GGBRRG=379, GGBRGB=383, GGBRBR=384, GGBGRR=387, GGBGGG=391, GGBGBB=395, GGBBRB=398, GGBBGR=399, GGBBBG=403, 
    GBRRRG=406, GBRRGB=410, GBRRBR=411, GBRGRR=414, GBRGGG=418, GBRGBB=422, GBRBRB=425, GBRBGR=426, GBRBBG=430, 
    GBGRRR=432, GBGRGG=436, GBGRBB=440, GBGGRB=443, GBGGGR=444, GBGGBG=448, GBGBRG=451, GBGBGB=455, GBGBBR=456, 
    GBBRRB=461, GBBRGR=462, GBBRBG=466, GBBGRG=469, GBBGGB=473, GBBGBR=474, GBBBRR=477, GBBBGG=481, GBBBBB=485, 
    BRRRRG=487, BRRRGB=491, BRRRBR=492, BRRGRR=495, BRRGGG=499, BRRGBB=503, BRRBRB=506, BRRBGR=507, BRRBBG=511, 
    BRGRRR=513, BRGRGG=517, BRGRBB=521, BRGGRB=524, BRGGGR=525, BRGGBG=529, BRGBRG=532, BRGBGB=536, BRGBBR=537, 
    BRBRRB=542, BRBRGR=543, BRBRBG=547, BRBGRG=550, BRBGGB=554, BRBGBR=555, BRBBRR=558, BRBBGG=562, BRBBBB=566, 
    BGRRRB=569, BGRRGR=570, BGRRBG=574, BGRGRG=577, BGRGGB=581, BGRGBR=582, BGRBRR=585, BGRBGG=589, BGRBBB=593, 
    BGGRRG=595, BGGRGB=599, BGGRBR=600, BGGGRR=603, BGGGGG=607, BGGGBB=611, BGGBRB=614, BGGBGR=615, BGGBBG=619, 
    BGBRRR=621, BGBRGG=625, BGBRBB=629, BGBGRB=632, BGBGGR=633, BGBGBG=637, BGBBRG=640, BGBBGB=644, BGBBBR=645, 
    BBRRRR=648, BBRRGG=652, BBRRBB=656, BBRGRB=659, BBRGGR=660, BBRGBG=664, BBRBRG=667, BBRBGB=671, BBRBBR=672, 
    BBGRRB=677, BBGRGR=678, BBGRBG=682, BBGGRG=685, BBGGGB=689, BBGGBR=690, BBGBRR=693, BBGBGG=697, BBGBBB=701, 
    BBBRRG=703, BBBRGB=707, BBBRBR=708, BBBGRR=711, BBBGGG=715, BBBGBB=719, BBBBRB=722, BBBBGR=723, BBBBBG=727
*/
// var decimal = fivesToRed.map(Decimalise)
// console.log(decimal);

/*
each of [ RB, GG, BR ] reduces to  G
each of [ RRG, GBB, BGR ] reduces to  RB
each of [ RBR, GGG, BRB ] reduces to  GG
each of [ RGB, GRR, BBG ] reduces to  BR

each of [ RG, GR, BB ] reduces to  B
each of [ RRB, GBR, BGG ] reduces to  RG
each of [ RBG, GGB, BRR ] reduces to  GR
each of [ RGR, GRG, BBB ] reduces to  BB

*/