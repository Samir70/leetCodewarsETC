// TLE on 53rd of 99
const base = 10**9 + 7;
const multMod = (a, b) => {
    let out = 0;
    while (b > 0) {
        if (b%2) {out = (out + a) % base}
        a = (a + a) % base;
        b = b >> 1
    }
    return out
}
const powerMod = (a, b) => {
    if (a === 1) {return 1}
    if (b === 1) {return a}
    let out = 1;
    while (b > 0) {
        if (b%2) {out = multMod(out, a)}
        a = multMod(a, a)
        b = b%2 ? (b-1)/2 : b/2
    }
    return out
}
var countSpecialSubsequences = function(nums) {
    let idxHash = [[], [], []]
    let ones = 0, twos = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 1) {ones++}
        if (nums[i] === 2) {twos++}
        idxHash[nums[i]].push({idx:i, ones, twos})
    }
    // console.log(idxHash);
    let out = 0;
    while (idxHash[0].length) {
        let cur = idxHash[0].pop()
        let zerosBefore = idxHash[0].length
        let waysToEndOnThisZero = powerMod(2,zerosBefore)
        let onesAfter = ones - cur.ones
        if (onesAfter === 0) {continue}
        let relevantOnes = idxHash[1].slice(-onesAfter)
        // console.log(relevantOnes, waysToEndOnThisZero)
        let waysToFinish = 0;
        while (relevantOnes.length) {
            let onesCur = relevantOnes.pop()
            let onesBefore = relevantOnes.length;
            let waysToEndOnThisOne = powerMod(2,onesBefore)
            let twosAfter = twos - onesCur.twos
            if (twosAfter === 0) {continue}
            waysToFinish = (waysToFinish + multMod(waysToEndOnThisOne, powerMod(2, twosAfter) - 1)) % base
            // console.log(onesCur, waysToFinish)
        }
        out = (out + multMod(waysToEndOnThisZero, waysToFinish)) % base
    }
    return out
};

const tests = [
    { nums: [0, 1, 0, 1, 2, 2, 2], out: 35 },
    { nums: [0, 1, 1, 2, 2, 2], out: 21 },
    { nums: [0, 1, 0, 1, 2, 1, 2, 2], out: 59 },
    { nums: [0, 1, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 1, 2, 2, 2, 2, 0, 1, 2], out: 2489999 }
]

tests.forEach((t, i) => console.log(
    'test', i, countSpecialSubsequences(t.nums) === t.out
))

/**
[
  [ { idx: 0, ones: 0, twos: 0 }, { idx: 2, ones: 1, twos: 0 } ],
  [
    { idx: 1, ones: 1, twos: 0 },
    { idx: 3, ones: 2, twos: 0 },
    { idx: 5, ones: 3, twos: 1 }
  ],
  [
    { idx: 4, ones: 2, twos: 1 },
    { idx: 6, ones: 3, twos: 2 },
    { idx: 7, ones: 3, twos: 3 }
  ]
]
[0, 1, 0, 1, 2, 1, 2, 2]
Relevant ones
[ { idx: 3, ones: 2, twos: 0 }, { idx: 5, ones: 3, twos: 1 } ]
[
  { idx: 1, ones: 1, twos: 0 },
  { idx: 3, ones: 2, twos: 0 },
  { idx: 5, ones: 3, twos: 1 }
]

relevant ones with details
[ { idx: 3, ones: 2, twos: 0 }, { idx: 5, ones: 3, twos: 1 } ] 2
{ idx: 5, ones: 3, twos: 1 } 6
{ idx: 3, ones: 2, twos: 0 } 13
[
  { idx: 1, ones: 1, twos: 0 },
  { idx: 3, ones: 2, twos: 0 },
  { idx: 5, ones: 3, twos: 1 }
] 1
{ idx: 5, ones: 3, twos: 1 } 12
{ idx: 3, ones: 2, twos: 0 } 26
{ idx: 1, ones: 1, twos: 0 } 33

 */