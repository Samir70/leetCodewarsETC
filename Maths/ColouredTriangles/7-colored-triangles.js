const pairs = {
  GG: 'G', RR: 'R', BB: 'B', RG: 'B', GR: 'B', GB: 'R', BG: 'R', BR: 'G', RB: 'G'
}
const reduceRowTo = (row, resultLength) => {
  if (row.length === resultLength) { return row }
  var newRow = '';
  for (var i = 0; i < row.length - 1; i++) {
    newRow += pairs[row[i] + row[i + 1]]
  }
  console.log(row, '-->', newRow);
  return reduceRowTo(newRow, resultLength);
}

// reduceRowTo('RBRGBRBGGRRRBGBBBGG', 1);
// Above worked for reasonably sized triangles
// but then timed out for larger triangles.
// It must consider T(n) pairs, so is O(n-squared)

// I considered
// BRRRRRRRRG --> GRRRRRRRB
// GRRRRRRRB --> BRRRRRRG
// BRRRRRRG --> GRRRRRB
// GRRRRRB --> BRRRRG
// BRRRRG --> GRRRB
// GRRRB --> BRRG
// BRRG --> GRB
// GRB --> BG
// BG --> R
// Note that the reds are going to reduce to a single R
// and a line like 
// newRow = row.replace(/(\w)\1+/g, '$1');
// but this was difficult to match the endings alternating BGBGB, especially when different 
// reduceRowTo('BRRRRRRRRGRRRRRRBRRBRGGG');

/*
started investigating how two find a row of shorter length that produces same result
The first two letters (KEYS) of the second row of the triangle only depend on the first four 
letters of the top row. 
Those KEYS can be produced by a three letter word. But the last two letters of the four-letter
word also effect the rest of row two. So can't be changed.
*/

// Find result of all four letter words:
// var reduced4LetterWords = {}
// for (var i = 0; i < 3 ** 3; i++) {
//   var base3 = i.toString(3);
//   while (base3.length < 3) { base3 = '0' + base3 }
//   base3 = [...base3].map(x => x === '0' ? 'R' : x === '1' ? 'G' : 'B').join('');
//   // console.log(base3, 'reduces to ', reduceRowTo(base3));
//   reduced4LetterWords[base3] = reduceRowTo(base3);
// }
// console.log(reduced4LetterWords);

// found RRRB reduces to RB 
// no three letter word ending in RB will reduce to RB

var reduced3LetterWords = {
  RRR: 'RR', RRG: 'RB', RRB: 'RG', RGR: 'BB', RGG: 'BG', RGB: 'BR', RBR: 'GG', RBG: 'GR', RBB: 'GB',
  GRR: 'BR', GRG: 'BB', GRB: 'BG', GGR: 'GB', GGG: 'GG', GGB: 'GR', GBR: 'RG', GBG: 'RR', GBB: 'RB',
  BRR: 'GR', BRG: 'GB', BRB: 'GG', BGR: 'RB', BGG: 'RG', BGB: 'RR', BBR: 'BG', BBG: 'BR', BBB: 'BB'
}

/* 
Suppose our tree will have at least 3 lines.
Can we find a shorter string which has the same third line?
Split the first line into stem and leaf, where the first three letters are the stem.
The first character of the third line is decided by the stem and 
the rest of the third line is decided by the leaf.
So we need a two letter stem that produces the same first letter of the third line.
but then you would need to process the lead twice to get the rest of the third line.
This doesn't seem to save us anything.
*/

var reduced4LetterWords = {
  RRRR: 'RR', RRRG: 'RG', RRRB: 'RB', RRGR: 'GB', RRGG: 'GR', RRGB: 'GG', RRBR: 'BG', RRBG: 'BB', RRBB: 'BR',
  RGRR: 'BG', RGRG: 'BB', RGRB: 'BR', RGGR: 'RR', RGGG: 'RG', RGGB: 'RB', RGBR: 'GB', RGBG: 'GR', RGBB: 'GG',
  RBRR: 'GB', RBRG: 'GR', RBRB: 'GG', RBGR: 'BG', RBGG: 'BB', RBGB: 'BR', RBBR: 'RR', RBBG: 'RG', RBBB: 'RB',
  GRRR: 'GR', GRRG: 'GG', GRRB: 'GB', GRGR: 'BB', GRGG: 'BR', GRGB: 'BG', GRBR: 'RG', GRBG: 'RB', GRBB: 'RR',
  GGRR: 'RG', GGRG: 'RB', GGRB: 'RR', GGGR: 'GR', GGGG: 'GG', GGGB: 'GB', GGBR: 'BB', GGBG: 'BR', GGBB: 'BG',
  GBRR: 'BB', GBRG: 'BR', GBRB: 'BG', GBGR: 'RG', GBGG: 'RB', GBGB: 'RR', GBBR: 'GR', GBBG: 'GG', GBBB: 'GB',
  BRRR: 'BR', BRRG: 'BG', BRRB: 'BB', BRGR: 'RB', BRGG: 'RR', BRGB: 'RG', BRBR: 'GG', BRBG: 'GB', BRBB: 'GR',
  BGRR: 'GG', BGRG: 'GB', BGRB: 'GR', BGGR: 'BR', BGGG: 'BG', BGGB: 'BB', BGBR: 'RB', BGBG: 'RR', BGBB: 'RG',
  BBRR: 'RB', BBRG: 'RR', BBRB: 'RG', BBGR: 'GG', BBGG: 'GB', BBGB: 'GR', BBBR: 'BR', BBBG: 'BG', BBBB: 'BB'
}
// What is promising is that every column has every two-digit result, 
// So I will be able to find four and five letter words that end in the same to letters and reduce to the same

var reduced5LetterWords = {
  RRRRR: 'RR', RRRRG: 'RB', RRRRB: 'RG', RRRGR: 'BR', RRRGG: 'BB', RRRGB: 'BG', RRRBR: 'GR', RRRBG: 'GB', RRRBB: 'GG',
  RRGRR: 'RR', RRGRG: 'RB', RRGRB: 'RG', RRGGR: 'BR', RRGGG: 'BB', RRGGB: 'BG', RRGBR: 'GR', RRGBG: 'GB', RRGBB: 'GG',
  RRBRR: 'RR', RRBRG: 'RB', RRBRB: 'RG', RRBGR: 'BR', RRBGG: 'BB', RRBGB: 'BG', RRBBR: 'GR', RRBBG: 'GB', RRBBB: 'GG',
  RGRRR: 'RB', RGRRG: 'RG', RGRRB: 'RR', RGRGR: 'BB', RGRGG: 'BG', RGRGB: 'BR', RGRBR: 'GB', RGRBG: 'GG', RGRBB: 'GR',
  RGGRR: 'RB', RGGRG: 'RG', RGGRB: 'RR', RGGGR: 'BB', RGGGG: 'BG', RGGGB: 'BR', RGGBR: 'GB', RGGBG: 'GG', RGGBB: 'GR',
  RGBRR: 'RB', RGBRG: 'RG', RGBRB: 'RR', RGBGR: 'BB', RGBGG: 'BG', RGBGB: 'BR', RGBBR: 'GB', RGBBG: 'GG', RGBBB: 'GR',
  RBRRR: 'RG', RBRRG: 'RR', RBRRB: 'RB', RBRGR: 'BG', RBRGG: 'BR', RBRGB: 'BB', RBRBR: 'GG', RBRBG: 'GR', RBRBB: 'GB',
  RBGRR: 'RG', RBGRG: 'RR', RBGRB: 'RB', RBGGR: 'BG', RBGGG: 'BR', RBGGB: 'BB', RBGBR: 'GG', RBGBG: 'GR', RBGBB: 'GB',
  RBBRR: 'RG', RBBRG: 'RR', RBBRB: 'RB', RBBGR: 'BG', RBBGG: 'BR', RBBGB: 'BB', RBBBR: 'GG', RBBBG: 'GR', RBBBB: 'GB',
  GRRRR: 'BR', GRRRG: 'BB', GRRRB: 'BG', GRRGR: 'GR', GRRGG: 'GB', GRRGB: 'GG', GRRBR: 'RR', GRRBG: 'RB', GRRBB: 'RG',
  GRGRR: 'BR', GRGRG: 'BB', GRGRB: 'BG', GRGGR: 'GR', GRGGG: 'GB', GRGGB: 'GG', GRGBR: 'RR', GRGBG: 'RB', GRGBB: 'RG',
  GRBRR: 'BR', GRBRG: 'BB', GRBRB: 'BG', GRBGR: 'GR', GRBGG: 'GB', GRBGB: 'GG', GRBBR: 'RR', GRBBG: 'RB', GRBBB: 'RG',
  GGRRR: 'BB', GGRRG: 'BG', GGRRB: 'BR', GGRGR: 'GB', GGRGG: 'GG', GGRGB: 'GR', GGRBR: 'RB', GGRBG: 'RG', GGRBB: 'RR',
  GGGRR: 'BB', GGGRG: 'BG', GGGRB: 'BR', GGGGR: 'GB', GGGGG: 'GG', GGGGB: 'GR', GGGBR: 'RB', GGGBG: 'RG', GGGBB: 'RR',
  GGBRR: 'BB', GGBRG: 'BG', GGBRB: 'BR', GGBGR: 'GB', GGBGG: 'GG', GGBGB: 'GR', GGBBR: 'RB', GGBBG: 'RG', GGBBB: 'RR',
  GBRRR: 'BG', GBRRG: 'BR', GBRRB: 'BB', GBRGR: 'GG', GBRGG: 'GR', GBRGB: 'GB', GBRBR: 'RG', GBRBG: 'RR', GBRBB: 'RB',
  GBGRR: 'BG', GBGRG: 'BR', GBGRB: 'BB', GBGGR: 'GG', GBGGG: 'GR', GBGGB: 'GB', GBGBR: 'RG', GBGBG: 'RR', GBGBB: 'RB',
  GBBRR: 'BG', GBBRG: 'BR', GBBRB: 'BB', GBBGR: 'GG', GBBGG: 'GR', GBBGB: 'GB', GBBBR: 'RG', GBBBG: 'RR', GBBBB: 'RB',
  BRRRR: 'GR', BRRRG: 'GB', BRRRB: 'GG', BRRGR: 'RR', BRRGG: 'RB', BRRGB: 'RG', BRRBR: 'BR', BRRBG: 'BB', BRRBB: 'BG',
  BRGRR: 'GR', BRGRG: 'GB', BRGRB: 'GG', BRGGR: 'RR', BRGGG: 'RB', BRGGB: 'RG', BRGBR: 'BR', BRGBG: 'BB', BRGBB: 'BG',
  BRBRR: 'GR', BRBRG: 'GB', BRBRB: 'GG', BRBGR: 'RR', BRBGG: 'RB', BRBGB: 'RG', BRBBR: 'BR', BRBBG: 'BB', BRBBB: 'BG',
  BGRRR: 'GB', BGRRG: 'GG', BGRRB: 'GR', BGRGR: 'RB', BGRGG: 'RG', BGRGB: 'RR', BGRBR: 'BB', BGRBG: 'BG', BGRBB: 'BR',
  BGGRR: 'GB', BGGRG: 'GG', BGGRB: 'GR', BGGGR: 'RB', BGGGG: 'RG', BGGGB: 'RR', BGGBR: 'BB', BGGBG: 'BG', BGGBB: 'BR',
  BGBRR: 'GB', BGBRG: 'GG', BGBRB: 'GR', BGBGR: 'RB', BGBGG: 'RG', BGBGB: 'RR', BGBBR: 'BB', BGBBG: 'BG', BGBBB: 'BR',
  BBRRR: 'GG', BBRRG: 'GR', BBRRB: 'GB', BBRGR: 'RG', BBRGG: 'RR', BBRGB: 'RB', BBRBR: 'BG', BBRBG: 'BR', BBRBB: 'BB',
  BBGRR: 'GG', BBGRG: 'GR', BBGRB: 'GB', BBGGR: 'RG', BBGGG: 'RR', BBGGB: 'RB', BBGBR: 'BG', BBGBG: 'BR', BBGBB: 'BB',
  BBBRR: 'GG', BBBRG: 'GR', BBBRB: 'GB', BBBGR: 'RG', BBBGG: 'RR', BBBGB: 'RB', BBBBR: 'BG', BBBBG: 'BR', BBBBB: 'BB'
}

// Find a four letter word and a five letter word that both 
// -- reduce to the same two-letters
// -- end in the same two letters
var collidingPairs = {};
const findCollidingPairs = () => {
  for (var i = 0; i < 3 ** 3; i++) {
    var fiveLetter = i.toString(3);
    while (fiveLetter.length < 5) { fiveLetter = '0' + fiveLetter }
    fiveLetter = [...fiveLetter].map(x => x === '0' ? 'R' : x === '1' ? 'G' : 'B').join('');
    var lastTwoLetters = fiveLetter.slice(3);
    var target = reduceRowTo(fiveLetter, 3);
    var prefix = ['RR', 'RG', 'RB', 'GR', 'GG', 'GB', 'BR', 'BG', 'BB'];
    var toTry = 0;
    while (toTry < 9 && reduceRowTo(prefix[toTry] + lastTwoLetters, 3) !== target) { toTry++ }
    if (toTry < 9) {
      console.log('fiveLetter: ', fiveLetter, 'target: ', target, 'fourLetter', prefix[toTry] + lastTwoLetters)
      collidingPairs[fiveLetter] = prefix[toTry] + lastTwoLetters
    } else { console.log(fiveLetter, 'did not have a match') }
  }
}
// findCollidingPairs();
// console.log(collidingPairs)

var preReduced = {}
const triangle = (row) => {
  if (row.length <= 5) { return reduceRowTo(row, 1) }
  var newRow = '';
  for (var i = 0; i <= row.length - 5; i++) {
    var fiveLetter = row.slice(i, i+5);
    newRow += preReduced[fiveLetter] || reduceRowTo(fiveLetter, 1)
  }
  console.log('reduced', row, ' 5 at a time to ', newRow);
  return triangle(newRow);
}

console.log(triangle('RBRGBRBGGRRRBGBBBGG'))