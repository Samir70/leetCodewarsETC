const digits = [
    'one', 'two', 'three', 'four', 'five',
    'six', 'seven', 'eight', 'nine', 'zero'
];
// console.log(new Set([...digits.join('')]));
const letters = new Set(['o', 'n', 'e', 't', 'w', 'h', 'r', 'f', 'u', 'i', 'v', 's', 'x', 'g', 'z']);
// let usedIn = {}
// for (let l of letters) {
//     usedIn[l] = digits.filter(num => num.indexOf(l) > -1)
// }
// console.log(usedIn)
usedIn = {
    w: ['two'],
    u: ['four'],
    x: ['six'],
    g: ['eight'],
    z: ['zero'],
    s: ['six', 'seven'], // already know how many 6's 24680
    h: ['three', 'eight'], // now can know 2346780
    f: ['four', 'five'], // now can know 23456780
    v: ['five', 'seven'],
    t: ['two', 'three', 'eight'],
    n: ['one', 'seven', 'nine'],
    r: ['three', 'four', 'zero'],
    o: ['one', 'two', 'four', 'zero'], // now can know 123456780
    i: ['five', 'six', 'eight', 'nine'], // and, finally,the 9
    e: ['one', 'three', 'five', 'seven', 'eight', 'nine', 'zero'],
}
// therefore: number of z's tells us how many zeros
var originalDigits = function (s) {
    let tally = {}
    for (let c of s) { tally[c] = (tally[c] || 0) + 1 }
    let count = Array(10).fill(0)
    count[2] = tally['w'] || 0
    count[4] = tally['u'] || 0
    count[6] = tally['x'] || 0
    count[8] = tally['g'] || 0
    count[0] = tally['z'] || 0
    count[7] = (tally['s'] || 0) - count[6]
    count[3] = (tally['h'] || 0) - count[8]
    count[5] = (tally['f'] || 0) - count[4]
    count[1] = (tally['o'] || 0) - (count[2] + count[4] + count[0])
    count[9] = (tally['i'] || 0) - (count[5] + count[6] + count[8])
    let out = ''
    console.log(tally, count)
    for (let i = 0; i < 10; i++) {
        while (count[i] > 0) { out += i; count[i]-- }
    }
    return out
};

/**
 * more efficient
 * public String originalDigits(String s) {
    int[] count = new int[10];
    for (int i = 0; i < s.length(); i++){
        char c = s.charAt(i);
        if (c == 'z') count[0]++;
        if (c == 'w') count[2]++;
        if (c == 'x') count[6]++;
        if (c == 's') count[7]++; //7-6
        if (c == 'g') count[8]++;
        if (c == 'u') count[4]++; 
        if (c == 'f') count[5]++; //5-4
        if (c == 'h') count[3]++; //3-8
        if (c == 'i') count[9]++; //9-8-5-6
        if (c == 'o') count[1]++; //1-0-2-4
    }
    count[7] -= count[6];
    count[5] -= count[4];
    count[3] -= count[8];
    count[9] = count[9] - count[8] - count[5] - count[6];
    count[1] = count[1] - count[0] - count[2] - count[4];
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i <= 9; i++){
        for (int j = 0; j < count[i]; j++){
            sb.append(i);
        }
    }
    return sb.toString();
}


 */

const tests = [
    { s: 'owoztneoer', out: '012' },
    { s: 'fviefuro', out: '45' }
];

tests.forEach((t, i) => console.log(
    'test', i, originalDigits(t.s) === t.out
))