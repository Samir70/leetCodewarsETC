/**
 * @param {number[]} arr
 * @return {number}
 */
const base = 10 ** 9 + 7;
const multMod = (a, b) => {
  let out = 0;
  while (b > 0) {
    if (b % 2) { out = (out + a) % base }
    a = (a + a) % base;
    b = b >> 1
  }
  return out
}
var numFactoredBinaryTrees = function (arr) {
  let hash = {}
  arr.sort((a, b) => a - b);
  let out = 0;
  for (let i = 0; i < arr.length; i++) {
    let cur = arr[i];
    let numTreesRootedAtCur = 1;
    for (let j = 0; j < i; j++) {
      let factor = arr[j];
      if (factor > Math.sqrt(cur)) { break }
      if (cur % factor === 0) {
        let otherFactor = cur / factor;
        let extraWays = multMod(hash[factor], (hash[otherFactor] || 0))
        if (factor !== otherFactor) { extraWays = multMod(extraWays, 2) }
        numTreesRootedAtCur = (numTreesRootedAtCur + extraWays) % base
      }
    }
    hash[cur] = numTreesRootedAtCur
    out = (out + numTreesRootedAtCur) % base
  }
  // console.log(hash)
  return out
};

const tests = [
  { args: [[2, 4]], out: 3 },
  { args: [[2, 4, 5, 10]], out: 7 },
  { args: [[2, 20, 4, 5, 10]], out: 18 },
  { args: [[2,20,4,5,10, 3, 12, 6, 18, 24, 32, 8, 16, 64, 30, 28, 7, 35, 36, 48, 120, 60, 50, 40, 45, 9, 27, 90, 180, 270, 288]], out: 5617 },
];

tests.forEach((t, i) => {
  let res = numFactoredBinaryTrees(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});