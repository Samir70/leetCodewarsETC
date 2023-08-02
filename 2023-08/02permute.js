/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  let n = nums.length;
  let cur = [[0]];
  while (cur[0].length < n) {
    let next = []
    let nd = cur[0].length; // next digit to place in permutations
    for (let p of cur) {
      let newPerm = [...p, nd];
      next.push(newPerm)
      for (let i = 0; i < nd; i++) {
        let q = [...p]
        let temp = q[i]
        q[i] = nd
        next.push([...q, temp])
      }
    }
    // console.log({cur, next})
    cur = [...next.map(a => a.join('-'))].map(a => a.split('-'))
  }
  const toElements = indices => indices.map(i => nums[i])
  return cur.map(toElements)
};

const tests = [
  { args: [[1, 2, 3]], out: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]] },
  { args: [[0, 1]], out: [[0, 1], [1, 0]] },
  { args: [[1]], out: [[1]] },
];

tests.forEach((t, i) => {
  let res = permute(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});