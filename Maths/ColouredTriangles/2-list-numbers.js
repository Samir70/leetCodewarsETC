const pairs = {
    GG: 'G', RR: 'R', BB: 'B', RG: 'B', GR: 'B', GB: 'R', BG: 'R', BR: 'G', RB: 'G'
}
const Decimalise = (rgb) => {
    var numStr = [...rgb].map(x => x === 'R' ? '0' : x === 'G' ? '1' : '2').join('');
    return parseInt(numStr, 3);
}
const decimal2RGB = (dec, len) => {
    var base3 = dec.toString(3);
    while (base3.length < len) { base3 = '0' + base3 }
    return [...base3].map(x => x === '0' ? 'R' : x === '1' ? 'G' : 'B').join('');
}

const reduceRow = (row) => {
    if (row.length === 1) { return row }
    var newRow = '';
    for (var i = 0; i < row.length - 1; i++) {
        newRow += pairs[row[i] + row[i + 1]]
    }
    console.log(row, '=', Decimalise(row), '-->', newRow, '=', Decimalise(newRow));
    return reduceRow(newRow);
};

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

reduceRow(decimal2RGB(3, 6))