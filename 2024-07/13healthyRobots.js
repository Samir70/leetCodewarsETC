/**
 * @param {number[]} positions
 * @param {number[]} healths
 * @param {string} directions
 * @return {number[]}
 */
class Robot {
  constructor(idx, p, h, d) {
    this.idx = idx
    this.pos = p
    this.health = h
    this.dir = d
  }
}
var survivedRobotsHealths = function (positions, healths, directions) {
  let robots = []
  for (let i = 0; i < positions.length; i++) {
    robots.push(new Robot(i, positions[i], healths[i], directions[i]))
  }
  robots.sort((a, b) => a.pos - b.pos)
  // console.log(robots)
  let stack = [robots[0]]
  const peek = () => stack[stack.length - 1]
  for (let r = 1; r < robots.length; r++) {
    let cur = robots[r]
    if (cur.dir === "R") {
      stack.push(cur)
      continue
    }
    // accounts for cases where cur doesn't collide with those to the left of it
    // if top of stack is L, it has battled all those going right and won
    //    and will not collide with cur
    let curSurvives = true
    while (peek() && curSurvives && peek().dir === "R") {
      let prev = peek()
      // prev, cur must be RL as LL, RR and LR are accounted for
      // prev, cur will collide
      // console.log({ prev, cur })
      if (prev.health === cur.health) {
        // eliminate both
        curSurvives = false
        stack.pop()
      } else if (prev.health < cur.health) {
        // eliminate prev, weaken cur
        stack.pop()
        cur.health--
      } else {
        // eliminate cur, ie: leave stack alone
        prev.health--
        curSurvives = false
      }
      // console.log(stack)
    }
    if (curSurvives) {
      stack.push(cur)
    }
  }
  stack.sort((a, b) => a.idx - b.idx)
  return stack.map(r => r.health)
};

const tests = [
  { args: [[5, 4, 3, 2, 1], [2, 17, 9, 15, 10], "RRRRR"], out: [2, 17, 9, 15, 10] },
  { args: [[3, 5, 2, 6], [10, 10, 15, 12], "RLRL"], out: [14] },
  { args: [[3, 5, 2, 6], [10, 9, 8, 12], "RLRL"], out: [10] },
  { args: [[7, 5, 2, 6], [10, 9, 8, 12], "RLRL"], out: [10, 8, 12] },
  { args: [[7, 5, 2, 6], [10, 9, 8, 12], "LLRL"], out: [10, 8, 12] },
  { args: [[7, 5, 2, 6], [10, 5, 8, 12], "LLRL"], out: [10, 11] },
  { args: [[1, 2, 5, 6], [10, 10, 11, 11], "RLRL"], out: [] },
  { args: [[1, 2, 5, 6], [10, 10, 11, 18], "RRRL"], out: [15] },
];

tests.forEach((t, i) => {
  // if (i !== 1) { return }
  let res = survivedRobotsHealths(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});