/**
 * @param {number[]} mapping
 * @param {number[]} nums
 * @return {number[]}
 */
var sortJumbled = function (mapping, nums) {
  const mapNum = n => {
    let numStr = "" + n
    let newNum = [...numStr].map(Number).map(d => mapping[d]).join("")
    return Number(newNum)
  }
  let sortable = nums.map(n => [n, mapNum(n)])
  return sortable.sort((a, b) => a[1] - b[1]).map(n => n[0])
};

const tests = [
  { args: [[8, 9, 4, 0, 2, 1, 3, 5, 7, 6], [991, 338, 38]], out: [338, 38, 991] },
  { args: [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [789, 456, 123]], out: [123, 456, 789] },
];

tests.forEach((t, i) => {
  let res = sortJumbled(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});