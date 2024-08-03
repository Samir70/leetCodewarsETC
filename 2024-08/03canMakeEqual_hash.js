/**
 * given target and arr, with same length, 
 * can arr be converted into target by reversing subArrays?
 * Basically: does each value have the same frequency in both arrays?
 * 
 * nb: could take advantage of constraint that all values are 1..1000
 * have a preMade array filled with zeros
 */

var canBeEqual = function (target, arr) {
  let hash = new Map();
  for (let i = 0; i < arr.length; i++) {
    let [a, t] = [arr[i], target[i]]
    if (hash.has(t)) {
      hash.set(t, hash.get(t) + 1)
    } else {
      hash.set(t, 1)
    }
    if (hash.has(a)) {
      hash.set(a, hash.get(a) - 1)
    } else {
      hash.set(a, -1)
    }
  }
  // console.log(hash)
  for (let [key, val] of hash) {
    if (val !== 0) { return false }
  }
  return true
};

const tests = [
  { args: [[1, 2, 3, 4], [2, 4, 1, 3]], out: true },
  { args: [[7], [7]], out: true },
  { args: [[3, 7, 9], [3, 7, 11]], out: false },
];

tests.forEach((t, i) => {
  let res = canBeEqual(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});