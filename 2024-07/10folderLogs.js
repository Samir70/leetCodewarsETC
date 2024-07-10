/**
 * @param {string[]} logs
 * @return {number}
 */
var minOperations = function (logs) {
  let depth = 0
  for (let log of logs) {
    if (log === "./") { continue }
    if (log === "../") {
      if (depth > 0) { depth-- }
    } else {
      depth++
    }
  }
  return depth
};
// var minOperations = function (logs) {
//   let stack = []
//   for (let log of logs) {
//     if (log === "../") {
//       stack.pop()
//     } else if (log !== "./") {
//       stack.push(log)
//     }
//   }
//   return stack.length
// };

const tests = [
  { args: [["d1/", "d2/", "../", "d21/", "./"]], out: 2 },
  { args: [["d1/", "d2/", "./", "d3/", "../", "d31/"]], out: 3 },
  { args: [["d1/", "../", "../", "../"]], out: 0 },
];

tests.forEach((t, i) => {
  let res = minOperations(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});