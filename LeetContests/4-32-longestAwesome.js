// s will be string of digits
// find longest substring which can be rearranged into palindrome

// slow, beating 9% but passes
var longestAwesome = function (s) {
    if (s === '') { return 0 }
    let tally = 0; // bits will be 0 or 1 depending on even or odd occurences
    let logFound = { 0: -1 };
    let bestAnswer = 1;
    for (let c in s) {
        let n = Number(s[c])
        let bit = 1 << n
        tally ^= bit
        if (logFound[tally] === undefined) {
            logFound[tally] = c
        } else {
            let posAnswer = c - logFound[tally];
            if (posAnswer > bestAnswer) { bestAnswer = posAnswer }
        }
        for (let i = 0; i < 10; i++) {
            let compare = tally ^ (1 << i);
            if (logFound[compare] !== undefined) {
                let posAnswer = c - logFound[compare];
                if (posAnswer > bestAnswer) { bestAnswer = posAnswer }
            }
        }
        // console.log(n, bit, tally);
        // console.log(logFound)
    }
    if (bestAnswer % 2 === 0 && bestAnswer < s.length) { bestAnswer++ }
    return bestAnswer
};

const tests = [
    // { s: "3242415", out: 5 },
    // { s: "12345678", out: 1 },
    { s: "213123", out: 6 },
    { s: "00", out: 2 },
    { s: "24342", out: 5 }
];

tests.forEach((t, i) => console.log(
    'test', i, longestAwesome(t.s), 'should be', t.out
))