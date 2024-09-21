/**
 * @param {number} n
 * @return {number[]}
 * n is less than 5*10^4
 */
let digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const addChildren = (h, n) => {
  for (let d of digits) {
    let child = h.val * 10 + d
    if (child === 0) { continue }
    if (child > n) {
      break
    }
    h.children.push({ val: child, children: [] })
  }
}
var lexicalOrder = function (n) {
  let head = { val: 0, children: [] }
  let out = []
  const dfs = h => {
    addChildren(h, n)
    // console.log(h)
    for (let child of h.children) {
      out.push(child.val)
      dfs(child)
    }
  }
  dfs(head, n)
  return out
};

const tests = [
  { args: [13], out: [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9] },
  { args: [2], out: [1, 2] },
];


const { compArrs } = require("../utilities/compareArrays")
tests.forEach((t, i) => {
  let res = lexicalOrder(...t.args);
  if (!compArrs(res, t.out)) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});