/**
 * @param {number[]} commands
 * @param {number[][]} obstacles
 * @return {number}
 */
var robotSim = function (commands, obstacles) {
  let dirs = [
    [1, 0], [0, 1], [-1, 0], [0, -1]
  ]
  let dir = 0
  let loc = [0, 0], maxDist = 0
  const dist = place => place.map(x => x * x).reduce((a, c) => a + c)
  let rowObsts = {}, colObsts = {}
  for (let [c, r] of obstacles) {
    if (rowObsts[r] === undefined) { rowObsts[r] = new Set() }
    if (colObsts[c] === undefined) { colObsts[c] = new Set() }
    rowObsts[r].add(c)
    colObsts[c].add(r)
  }
  for (let com of commands) {
    if (com === -1) {
      dir++
    } else if (com === -2) {
      dir--
    } else {
      while (com > 0) {
        com--
        let newLoc = [loc[0] + dirs[dir][0], loc[1] + dirs[dir][1]]
        if (rowObsts[newLoc[0]] && rowObsts[newLoc[0]].has(newLoc[1])) { break }
        if (colObsts[newLoc[1]] && colObsts[newLoc[1]].has(newLoc[0])) { break }
        loc = [...newLoc]
      }
      maxDist = Math.max(maxDist, dist(loc))
    }
    if (dir < 0) { dir = 3 }
    if (dir > 3) { dir = 0 }
    // console.log({ com, dir, d: dirs[dir], loc, maxDist })
  }
  return maxDist
};

const tests = [
  { args: [[4, -1, 3], []], out: 25 },
  { args: [[4, -1, 4, -2, 4], [[2, 4]]], out: 65 },
  { args: [[6, -1, -1, 6], []], out: 36 },
  {
    args: [[7, -2, -2, 7, 5],
    [[-3, 2], [-2, 1], [0, 1], [-2, 4], [-1, 0], [-2, -3], [0, -3], [4, 4], [-3, 3], [2, 2]]], out: 4
  },
];

tests.forEach((t, i) => {
  let res = robotSim(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});