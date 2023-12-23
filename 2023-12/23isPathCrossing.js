/**
 * @param {string} path
 * @return {boolean}
 */
var isPathCrossing = function (path) {
  let visited = new Set()
  let cur = [0, 0]
  visited.add(cur.join(','))
  const dirs = {
    'N': [-1, 0], 'S': [1, 0],
    'W': [0, -1], 'E': [0, 1]
  }
  for (let c of path) {
    let d = dirs[c]
    cur = [cur[0] + d[0], cur[1] + d[1]]
    let key = cur.join(',')
    if (visited.has(key)) { return true }
    visited.add(key)
  }
  return false
};

const tests = [
  { args: ["NES"], out: false },
  { args: ["NESWW"], out: true },
];

tests.forEach((t, i) => {
  let res = isPathCrossing(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});