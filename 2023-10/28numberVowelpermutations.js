/**
 * @param {number} n
 * @return {number}
 */
const base = 10 ** 9 + 7;
const canPrecede = {
  "a": "eiu",
  "e": "ai",
  "i": "eo",
  "o": "i",
  "u": "io",
}
const countVowelPermutation = n => {
  let waysToEndWith = {
    "a": Array(n + 1).fill(1),
    "e": Array(n + 1).fill(1),
    "i": Array(n + 1).fill(1),
    "o": Array(n + 1).fill(1),
    "u": Array(n + 1).fill(1),
  }
  let len = 1;
  while (len < n) {
    len++
    for (let cur of "aeiou") {
      let waysToEndWithCur = 0;
      for (let prev of canPrecede[cur]) {
        waysToEndWithCur += waysToEndWith[prev][len - 1]
        waysToEndWithCur %= base;
      }
      waysToEndWith[cur][len] = waysToEndWithCur
    }
  }
  let totalWays = 0;
  for (let c of "aeiou") {
    totalWays += waysToEndWith[c][len];
    totalWays %= base;
  }
  return totalWays
}

// Maximum call stack size exceeded for 20000
// const canFollow = {
//   "": "aeiou",
//   "a": "e",
//   "e": "ai",
//   "i": "aeou",
//   "o": "iu",
//   "u": "a",
// }
// const multMod = (a, b) => {
//   let out = 0;
//   while (b > 0) {
//     if (b % 2) { out = (out + a) % base }
//     a = (a + a) % base;
//     b = b >> 1
//   }
//   return out
// }
// var countVowelPermutation = function (n) {
//   let memo = {}
//   const waysToFinish = (len, lastChar, waysToGetHere) => {
//     if (len === n) { return 1 }
//     let key = [len, lastChar, waysToGetHere].join("");
//     if (memo[key] !== undefined) { return memo[key] }
//     let waysPerChar = 0;
//     for (let succ of canFollow[lastChar]) {
//       waysPerChar += waysToFinish(len + 1, succ, waysToGetHere);
//       waysPerChar %= base
//     }
//     // console.log({ len, lastChar, waysToGetHere })
//     memo[key] = multMod(waysToGetHere, waysPerChar)
//     return memo[key]
//   }
//   return waysToFinish(0, "", 1)
// };

const tests = [
  { args: [1], out: 5 },
  { args: [2], out: 10 },
  { args: [5], out: 68 },
  { args: [15], out: 44779 },
  { args: [200], out: 670333618 },
  { args: [20000], out: 759959057 },
];

tests.forEach((t, i) => {
  let res = countVowelPermutation(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});