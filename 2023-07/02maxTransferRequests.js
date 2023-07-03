/**
 * @param {number} n
 * @param {number[][]} requests
 * @return {number}
 */
var maximumRequests = function (n, requests) {
  let ans = 0;
  let maxmask = 2 ** (requests.length);
  // console.log({n, rlen: requests.length, maxmask})
  for (let bitmask =  0; bitmask < maxmask; bitmask++) {
    let inCount = Array(n).fill(0);
    let count = 0;
    let pointer = 1;
    for (let reqIndex = 0; reqIndex < requests.length; reqIndex++) {
      let [from, to] = requests[reqIndex];
      if (bitmask & pointer) {
        inCount[from]--
        inCount[to]++
        count++
      }
      pointer <<= 1
    }
    if (inCount.every(c => c === 0)) {
      ans = Math.max(ans, count)
    }
  }
  return ans
};

const tests = [
  { args: [5, [[0, 1], [1, 0], [0, 1], [1, 2], [2, 0], [3, 4]]], out: 5 },
  { args: [3, [[0, 0], [1, 2], [2, 1]]], out: 3 },
  { args: [4, [[0, 3], [3, 1], [1, 2], [2, 0]]], out: 4 },
];

tests.forEach((t, i) => {
  let res = maximumRequests(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});