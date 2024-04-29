/**
 * @param {string} ring
 * @param {string} key
 * @return {number}
 */
var findRotateSteps = function (ring, key) {
  const countSteps = (i, j) => {
    let forward = Math.abs(i - j)
    let backward = ring.length - forward
    return Math.min(forward, backward)
  }

  const memo = {}
  const tryLock = (ringIndex, keyIndex, minSteps) => {
    if (keyIndex === key.length) { return 0 }
    let mkey = [ringIndex, keyIndex].join(",")
    if (memo[mkey] !== undefined) { return memo[mkey] }
    for (let i = 0; i < ring.length; i++) {
      if (ring[i] === key[keyIndex]) {
        let steps = countSteps(i, ringIndex)
        steps++
        steps += tryLock(i, keyIndex + 1, Infinity)
        minSteps = Math.min(minSteps, steps)
      }
    }
    memo[mkey] = minSteps
    return minSteps
  }

  return tryLock(0, 0, Infinity)
};

const tests = [
  { args: ["godding", "gd"], out: 4 },
  { args: ["godding", "godding"], out: 13 },
];

tests.forEach((t, i) => {
  let res = findRotateSteps(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});