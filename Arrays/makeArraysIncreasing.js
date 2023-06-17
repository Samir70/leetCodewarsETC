/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number}
 */

const key = (a, b) => [a, b].join(',');
const binSearch = (arr, val) => {
  let left = 0, right = arr.length;
  while (left < right) {
    let mid = Math.floor((left + right) / 2)
    if (arr[mid] <= val) {
      left = mid + 1
    } else {
      right = mid
    }
  }
  return left < arr.length ? left : null
}

var makeArrayIncreasing = function (arr1, arr2) {
  arr2 = arr2.sort((a, b) => a - b);
  let hash = {}
  /**
   * returns number of ops needed to make arr1[1:] increasing, 
   * prev is arr1[i - 1]
   * @param {number} i 
   * @param {number} prev 
   */
  const helper = (i, prev) => {
    if (i === arr1.length) { return 0 }
    if (hash[key(i, prev)] !== undefined) { return hash[key(i, prev)] }
    let cost = Infinity;
    if (arr1[i] > prev) {
      cost = helper(i + 1, arr1[i])
    }
    let replacement = binSearch(arr2, prev);
    if (replacement !== null) {
      cost = Math.min(cost, 1 + helper(i + 1, arr2[replacement]))
    }
    hash[key(i, prev)] = cost;
    return cost
  }
  let cost = helper(0, -1);
  // console.log(hash)
  return cost === Infinity ? -1 : cost
};

const tests = [
  { args: [[1, 5, 3, 6, 7], [1, 3, 2, 4]], out: 1 },
  { args: [[1, 5, 3, 6, 7], [4, 3, 1]], out: 2 },
  { args: [[4, 5, 3, 6, 7], [2, 3, 1]], out: 2 },
  { args: [[4, 5, 3, 6], [4, 5, 3]], out: 3 },
  { args: [[1, 5, 3, 6, 7], [1, 6, 3, 3]], out: -1 }
];

tests.forEach((t, i) => {
  let res = makeArrayIncreasing(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});