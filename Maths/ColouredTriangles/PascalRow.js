const pascalRow = (n) => {
    var row = [1];
    var top = n, bottom = 1;
    while (top > bottom) {
        row.push((row[bottom - 1] * top) / bottom)
        top--; bottom++
    }
    while (top > 0) {
        top--;
        row.push(row[top]);
    }
    return row;
}

// [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(x => console.log(pascalRow(x)));
// console.log(pascalRow(100))

const add1Mod3 = (arr) => {
    var count = arr.length - 1;
    var carry = true;
    while (carry && count >= 0) {
        carry = arr[count] === 2 ? true : false;
        arr[count] = (arr[count] + 1) % 3;
        count--;
    }
    return arr
}

const binomial = (m, n) => {
    if (m < n) { return 0 } // handles 01, 02, 12
    if (m === n) { return 1 } // handles 00, 11, 22
    if (m === 1 && n === 0) { return 1 }
    // m must be 2
    return n === 0 ? 1 : n === 1 ? 2 : 1
}

const LucasCoeffs = (m3, n3) => { //m3 is in base 3, array of digits
    var count = m3.length;
    var partials = [];
    for (var i = 0; i < count; i++) {
        partials.push(binomial(m3[i], n3[i]));
    }
    // console.log('m:', m3, 'n:', n3);
    // console.log('partials:', partials)
    return partials.reduce((acc, v) => acc * v, 1) % 3;
}

const pascalRowMod3 = (m) => {
    var m3 = [...m.toString(3)].map(Number);
    var n3 = m3.map(x => 0); //start by choosing zero
    var row = [];
    for (var i = 0; i <= m; i++) {
        row.push(LucasCoeffs(m3, n3));
        n3 = add1Mod3(n3);
    }
    // var padding = Array(Math.floor((28-row.length)/2)).join(' ')
    return row.join('');
}

// [11, 12, 13, 14, 5, 6, 7, 8, 9].forEach(x => console.log(pascalRow(x), 'mod 3', pascalRowMod3(x)));
// console.log(pascalRow(100))
// [...Array(27)].forEach((x, i) => console.log(pascalRowMod3(i+1)));
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

// [1, 3, 9, 27, 81, 243].forEach(x => console.log(x, pascalRowMod3(x) === rowForPowerOf3(x)))
// [1, 3, 9, 27, 81, 243].map(x => 2 * x).forEach(x => console.log(x, pascalRowMod3(x) === rowForTwicePowerof3(x)))

const nameParts = (n) => {
    var base3 = n.toString(3);
    var highest = [...base3].map((x, i) => i > 0 ? '0' : x).join('');
    var rest = base3.slice(1);
    return { highest: parseInt(highest, 3), rest: parseInt(rest, 3), type: base3[0] }
}

const zeros = (n) => n === 0 ? '' : Array(n + 1).join('0');
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

// for (var i = 0; i < 10; i++) {
//     var num = Math.floor(Math.random() * 500) + 10;
//     if (pascalRowMod3(num) === pascal3(num)) {
//         console.log(num, 'both agree')
//     } else {
//         console.log(num, 'ooops', nameParts(num))
//         console.log(pascalRowMod3(num));
//         console.log(pascal3(num));
//     }
// }
module.exports = { pascalRow, pascalRowMod3, pascal3 }