/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var kthSmallestPrimeFraction = function (arr, k) {
  let fracs = []
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      fracs.push([arr[i], arr[j], arr[i] / arr[j]])
    }
  }
  fracs.sort((a, b) => a[2] - b[2])
  // console.log(fracs)
  return fracs[k - 1].slice(0, 2)
};

const tests = [
  { args: [[1, 2, 3, 5], 3], out: [2, 5] },
  { args: [[1, 7], 1], out: [1, 7] },
];

tests.forEach((t, i) => {
  let res = kthSmallestPrimeFraction(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});