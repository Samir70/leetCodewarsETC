/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  let prodFront = 1, prodEnd = 1;
  let n = nums.length;
  let preProds = [], suffProds = Array(n).fill(1)
  for (let i = 0; i < n; i++) {
    prodFront *= nums[i]
    prodEnd *= nums[n - i - 1]
    preProds.push(prodFront)
    suffProds[n - i - 1] = prodEnd
  }
  // console.log({ preProds, suffProds })
  let out = Array(n)
  for (let i = 0; i < n; i++) {
    out[i] = (preProds[i - 1] === undefined ? 1 : preProds[i - 1])
      * (suffProds[i + 1] === undefined ? 1 : suffProds[i + 1])
  }
  return out
};

const tests = [
  { args: [[1, 2, 3, 4]], out: [24, 12, 8, 6] },
  { args: [[-1, 1, 0, -3, 3]], out: [0, 0, 9, 0, 0] },
  { args: [[1, 2, 3, 4, 3, 2, 2, 1, 5, 4, 3, 2, 1]], out: [34560, 17280, 11520, 8640, 11520, 17280, 17280, 34560, 6912, 8640, 11520, 17280, 34560] },
];

tests.forEach((t, i) => {
  let res = productExceptSelf(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});