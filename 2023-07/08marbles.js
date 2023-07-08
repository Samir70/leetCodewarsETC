/**
 * @param {number[]} weights
 * @param {number} k
 * @return {number}
 */
var putMarbles = function (weights, k) {
  let pairWeights = [], n = weights.length
  for (let i = 1; i < weights.length; i++) {
    pairWeights.push(weights[i] + weights[i - 1])
  }
  pairWeights = pairWeights.sort((a, b) => a - b)
  let max = weights[0] + weights[n - 1], min = max
  for (let i = 0; i < k - 1; i++ ) {
    max += pairWeights[n - 2 - i]
    min += pairWeights[i]
  }
  return max - min
}

var putMarbles2 = function (weights, k) {
  // uses too much memory
  let memo = {}
  const helper = (weights, k) => {
    if (k === 1) {
      let sum = weights[0] + weights[weights.length - 1]
      return { max: sum, min: sum }
    }
    if (weights.length === k) {
      let sum = weights.reduce((a, c) => a + c, 0)
      return { max: sum*2, min: sum*2 }
    }
    let key = weights.join(",") + "," + k;
    if (memo[key] !== undefined) { return memo[key] }
    let min = Infinity, max = 0;
    for (let i = 1; i < weights.length; i++) {
      if (weights.slice(i).length < k - 1) { 
        // console.log("list too small", {weights, i, k})
        continue 
      }
      let costLeft = weights[0] + weights[i - 1];
      let costOfRest = helper(weights.slice(i), k - 1);
      // console.log(weights.slice(i), { weights, costLeft, costOfRest, k, i })
      // if (cost === Infinity || cost === -Infinity) {
      //   return
      // }
      min = Math.min(min, costLeft + costOfRest.min)
      max = Math.max(max, costLeft + costOfRest.max)
    }
    // console.log({ weights, k, max, min })
    memo[key] = { max, min }
    return memo[key]
  }
  let { max, min } = helper(weights, k)
  return max - min
};



const tests = [
  { args: [[1, 3, 5, 1], 2], out: 4 },
  { args: [[1, 3, 5, 1], 3], out: 4 },
  { args: [[1, 3], 2], out: 0 },
  { args: [[1, 34, 5, 6, 7, 43, 4, 23, 4, 6, 76, 5, 4, 3, 3, 43, 54], 2], out: 91 },
  { args: [[1, 34, 5, 6, 7, 43, 4, 23, 4, 6, 76, 5, 4, 3, 3, 43, 54], 3], out: 166 },
  { args: [[1, 34, 5, 6, 7, 43, 4, 23, 4, 6, 76, 5, 4, 3, 3, 43, 54], 6], out: 314 },
];

tests.forEach((t, i) => {
  // if (i !== 1) { return }
  let res = putMarbles(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});