/**
 * @param {number[]} nums
 * @return {number}
 */
var subsetXORSum = function (nums) {
  let maskLimit = 2 ** nums.length
  let sum = 0
  for (let i = 0; i < maskLimit; i++) {
    let xorSum = 0
    let mask = i.toString(2)
    while (mask.length < nums.length) { mask = "0" + mask }
    for (j = 0; j < mask.length; j++) {
      if (mask[j] === "1") {
        xorSum ^= nums[j]
      }
    }
    // console.log({ mask, xorSum })
    sum += xorSum
  }
  return sum
};

const tests = [
  { args: [[1, 3]], out: 6 },
  { args: [[5, 1, 6]], out: 28 },
  { args: [[3, 4, 5, 6, 7, 8]], out: 480 },
  { args: [[3, 4, 5, 6, 7, 8, 1, 15, 17, 14, 13, 12]], out: 63488 },
];

tests.forEach((t, i) => {
  let res = subsetXORSum(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});