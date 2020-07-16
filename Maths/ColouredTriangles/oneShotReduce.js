// having solved this in a long winded way, I quite liked some of the solutions I saw. 
// But they weren't obvious in the way they were written, so...
/* following on from idea of dgarceau
            11
           121
           1001    row 3, 
          11011
          121121
         1002001    row 6
         11022011
        121212121
        1000000001   row 9
       11000000011      row9+1 needs two copies of row 1
       121000000121     row9+2 needs two copies of row2
      1001000001001
      11011000011011
     121121000121121
     1002001001002001
    11022011011022011   row9+7 needs two copies of row 7
    121212121121212121  row9+8 needs two copies of row 8
   1000000002000000001          row 18
   11000000022000000011         row18+1 needs three copies of row 1, middle inverted
  121000000212000000121         
  1001000002002000001001
 11011000022022000011011
 121121000212212000121121       row18+5 needs three copies of row 5, middle inverted
1002001002001002001002001
11022011022011022011022011
121212121212121212121212121     row18+8 needs three copies of row 8, middle inverted
1000000000000000000000000001    row27
*/

const rowForPowerOf3 = (n) => '1' + Array(n).join('0') + '1';
// array with n elements needs n-1 joins
const rowForTwicePowerof3 = (n) => '1' + Array(n / 2).join('0') + 2 + Array(n / 2).join('0') + '1';

const nameParts = (n) => {
    var base3 = n.toString(3);
    var highest = [...base3].map((x, i) => i > 0 ? '0' : x).join('');
    var rest = base3.slice(1);
    return { highest: parseInt(highest, 3), rest: parseInt(rest, 3), type: base3[0] }
}
// eg: 58 is { highest: 54, rest: 4, type: '2' }

const zeros = (n) => n === 0 ? '' : Array(n + 1).join('0');
// should really call that in above functions!!
const reverse = (row) => [...row].map(x => x==='1' ? '2' : x==='2' ? '1' : '0').join('');

const pascal3 = (n) => {
    if (n === 0) { return '1' }
    if (n === 1) { return '11' }
    if (n === 2) { return '121' }
    var parts = nameParts(n);
    if (parts.rest === 0) {
        return parts.type === '1' ? rowForPowerOf3(n) : rowForTwicePowerof3(n)
    }
    // n isn't a power of three or twice a power of 3
    var short = pascal3(parts.rest);
    if (parts.type === '1') {
        // n is between a power of 3 and twice that power, 
        // only need two copies of the shorter rows
        // each of these is of length parts.rest + 1
        // length of required row is n+1
        var padding = (n + 1) - 2 * (parts.rest + 1);
        return short + zeros(padding) + short
    }
    // n is between twice a power of three and the next power
    // need three copies, middle one reversed
    // each is of length parts.rest+1
    padding = ((n+1) - 3* (parts.rest+1))/2;
    // by symmetry: the padding is split into two equal parts, so the total must be even
    return short+zeros(padding)+reverse(short)+zeros(padding)+short;
}

const colourDigits = {
    R: '0', G: '1', B: '2'
}
const colourLetters = [...'RGB'];
const innerProd = (u, v) => 
    u.map((x, i) => x*v[i]).reduce((acc, val) => acc+val, 0)

const triangle = (row) => {
    var len = row.length;
    var pRow = [...pascal3(len-1)].map(x=> len%2 === 0 ? (x*2)%3 : x);
    var digits = [...row].map(x => Number(colourDigits[x]));
    return colourLetters[innerProd(digits, pRow)%3]
}

module.exports = { triangle }