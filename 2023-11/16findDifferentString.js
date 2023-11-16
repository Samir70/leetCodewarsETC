/**
 * @param {string[]} nums
 * @return {string}
 */
var findDifferentBinaryString = function (nums) {
  let out = "", alt = { "0": 1, "1": 0 }
  for (let i = 0; i < nums.length; i++) {
    out += alt[nums[i][i]]
  }
  return out
};

const tests = [
  { args: [["01", "10"]], out: "11" },
  { args: [["00", "01"]], out: "10" },
  { args: [["111", "011", "001"]], out: "000" },
];

tests.forEach((t, i) => {
  let res = findDifferentBinaryString(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});