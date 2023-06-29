/**
 * @param {string[]} grid
 * @return {number}
 */
// Gets right answer but uses too much memory

const collectedString = colSet => {
  let out = ""
  for (let k of "abcdef".split("")) {
    if (colSet.has(k)) {out += k}
  }
  return out
}

const addSquareTo = (stack, from, dest, key) => {
  let state = collectedString(from.collected) + dest.join(",")
  if (from.visited.has(state)) { return }
  let newObj = {
    sq: dest,
    collected: new Set([...from.collected]),
    visited: new Set([...from.visited]),
    steps: from.steps + 1
  }
  if (key !== null) {
    newObj.collected.add(key)
    // console.log("Added key: " + key, newObj)
  }
  state = collectedString(newObj.collected) + dest.join(",")
  newObj.visited.add(state)
  stack.push(newObj)
}
var shortestPathAllKeys = function (grid) {
  let rows = grid.length, cols = grid[0].length
  let start;
  let keys = new Set();
  let possKeys = "abcdef", possLocks = "ABCDEF"
  let stateSteps = {}
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (possKeys.includes(grid[r][c])) {
        keys.add(grid[r][c])
      }
      if (grid[r][c] === '@') {
        start = [r, c]
      }
    }
  }
  // console.log({keys, start})
  let stack = [{ sq: start, visited: new Set(), collected: new Set(), steps: 0 }];
  while (stack.length > 0) {
    let newStack = []
    while (stack.length > 0) {
      let cur = stack.pop()
      let state = collectedString(cur.collected) + cur.sq.join(",")
      if (cur.collected.size === keys.size) {
        // console.log(grid, cur)
        return cur.steps
      }
      if (stateSteps[state] && stateSteps[state] < cur.steps) {
        // console.log("skipping", cur)
        continue
      }
      stateSteps[state] = cur.steps
      // console.log(cur)
      // if (cur.steps > 9) {return -1000}
      let nextSteps = [
        [-1, 0], [1, 0], [0, -1], [0, 1]
      ].map(d => [d[0] + cur.sq[0], d[1] + cur.sq[1]])
      for ([r, c] of nextSteps) {
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === "#") {
          continue
        }
        if (possKeys.includes(grid[r][c])) {
          addSquareTo(newStack, cur, [r, c], grid[r][c])
        }
        if (possLocks.includes(grid[r][c])) {
          if (cur.collected.has(grid[r][c].toLowerCase())) {
            addSquareTo(newStack, cur, [r, c], null)
          }
        }
        if (grid[r][c] === "." || grid[r][c] === "@") {
          addSquareTo(newStack, cur, [r, c], null)
        }
      }
    }
    stack = [...newStack]
    // console.log(newStack.length)
  }
  return -1
};

const tests = [
  { args: [["@.a..", "###.#", "b.A.B"]], out: 8 },
  { args: [["@..aA", "..B#.", "....b"]], out: 6 },
  { args: [["@Aa"]], out: -1 },
  { args: [["@abcdeABCDEFf"]], out: -1 },
  {
    args: [[
      ".#.b.",
      "A.#aB",
      "#d...",
      "@.cC.",
      "D...#"
    ]], out: 8
  },
  {
    args: [[
      "@...a",
      ".###A",
      "b.BCc"
    ]], out: 10
  },
  {
    args: [[
      "..#....##.",
      "....d.#.D#",
      "#...#.c...",
      "..##.#..a.",
      "...#....##",
      "#....b....",
      ".#..#.....",
      "..........",
      ".#..##..A.",
      ".B..C.#..@"
    ]], out: 19
  }
];

tests.forEach((t, i) => {
  // if (i !== 6) { return}
  let res = shortestPathAllKeys(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});