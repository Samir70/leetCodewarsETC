/**
 * @param {number[]} target
 * @param {number} n
 * @return {string[]}
 */
var buildArray = function (target, n) {
  let ops = [], pointer = 0;
  let stream = 1;
  while (pointer < target.length) {
    ops.push("Push")
    if (target[pointer] !== stream) {
      ops.push("Pop")
    } else {
      pointer++
    }
    stream++
  }
  return ops
};

const tests = [
  { args: [[1, 3], 3], out: ["Push", "Push", "Pop", "Push"] },
  { args: [[1, 2, 3], 3], out: [["Push", "Push", "Push"]] },
  { args: [[1, 2], 4], out: ["Push", "Push"] },
  { args: [[2, 4, 5], 5], out: ["Push", "Pop", "Push", "Push", "Pop", "Push", "Push"] },
];

tests.forEach((t, i) => {
  let res = buildArray(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});