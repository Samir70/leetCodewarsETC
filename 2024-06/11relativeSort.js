/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */
var relativeSortArray = function (arr1, arr2) {
  let tally = {}
  for (let n of arr2) { tally[n] = 0 }
  let putInOrdinaryOrder = []
  for (let n of arr1) {
    if (tally[n] !== undefined) {
      tally[n]++
    } else {
      putInOrdinaryOrder.push(n)
    }
  }
  putInOrdinaryOrder.sort((a, b) => a - b)
  let out = []
  for (let n of arr2) {
    out.push(...Array(tally[n]).fill(n))
  }
  return [...out, ...putInOrdinaryOrder]
};

const tests = [
  { args: [[2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19], [2, 1, 4, 3, 9, 6]], out: [2, 2, 2, 1, 4, 3, 3, 9, 6, 7, 19] },
  { args: [[28, 6, 22, 8, 44, 17], [22, 28, 8, 6]], out: [22, 28, 8, 6, 17, 44] },
];

tests.forEach((t, i) => {
  let res = relativeSortArray(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});