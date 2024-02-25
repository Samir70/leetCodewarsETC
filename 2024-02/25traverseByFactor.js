/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canTraverseAllPairs = function (nums) {
  let n = nums.length
  if (n === 1) { return true }
  let parent = [...Array(n)].map((x, i) => i);
  let ranks = Array(n).fill(1)
  let isCoprimeToAll = Array(n).fill(true)

  const findParent = node => {
    return parent[node] === node ? node : findParent(parent[node])
  }
  const union = (a, b) => {
    let compA = findParent(a)
    let compB = findParent(b)
    if (compA !== compB) {
      if (ranks[compA] <= ranks[compB]) {
        parent[compA] = compB
        ranks[compB] += ranks[compA]
      } else {
        parent[compB] = compA
        ranks[compA] += ranks[compB]
      }
      return Math.max(ranks[compA], ranks[compB])
    }
    return Math.max(ranks[compA], ranks[compB])
  }

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      let a = nums[i], b = nums[j]
      if (gcd(a, b) > 1) {
        if (a !== b) { isCoprimeToAll[i] = false; isCoprimeToAll[j] = false }
        let rank = union(i, j)
        // console.log({ i, j, parent, ranks })
        if (rank === n) { return true }
      }
    }
    if (isCoprimeToAll[i]) { return false }
  }

  return Math.max(...ranks) === n
};

const gcd = (a, b) => {
  if (b === 0 || a === b) { return a }
  if (a === 0) { return b }
  return a > b ? gcd(a % b, b) : gcd(a, b % a)
}

const bigtest = Array(100000).fill(5)
const { bigtest2 } = require("./25bigtest2")
const tests = [
  { args: [[2]], out: true },
  { args: [[2, 3, 6]], out: true },
  { args: [[3, 9, 5]], out: false },
  { args: [[4, 3, 12, 8]], out: true },
  { args: [[42, 98, 75, 55]], out: true },
  { args: [[33, 22, 30, 11, 39, 7, 10, 50, 50, 9, 30, 21, 48, 30, 30, 21, 42, 40, 10, 50, 30, 30, 40, 50, 42, 10, 14, 40]], out: true },
  { args: [bigtest], out: true },
  { args: [bigtest2], out: false },
];

tests.forEach((t, i) => {
  let res = canTraverseAllPairs(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});
