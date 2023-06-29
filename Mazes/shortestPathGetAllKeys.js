/**
 * @param {string[]} grid
 * @return {number}
 */
// Gets right answer but uses too much memory

const key2Val = k => 1 << (k.charCodeAt(0) - 'a'.charCodeAt(0))
const lock2Val = lock => 1 << (lock.charCodeAt(0) - "A".charCodeAt(0))

var shortestPathAllKeys = function (grid) {
  let rows = grid.length, cols = grid[0].length
  let start;
  let possKeys = "abcdef", possLocks = "ABCDEF"
  let allKeys = 0;
  let seen = new Set()
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (possKeys.includes(grid[r][c])) {
        allKeys += key2Val(grid[r][c])
      }
      if (grid[r][c] === '@') {
        start = [r, c]
      }
    }
  }
  // console.log({allKeys, start})
  let stack = [[...start, 0, 0]]// row, col, collectedKeys, steps
  while (stack.length > 0) {
    let newStack = []
    while(stack.length > 0) {
      let cur = stack.pop()
      let nextSteps = [
        [-1, 0], [1, 0], [0, -1], [0, 1]
      ].map(d => [d[0] + cur[0], d[1] + cur[1]])
      for ([r, c] of nextSteps) {
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === "#") {
          continue
        }
        if (possLocks.includes(grid[r][c]) && ((cur[2] & lock2Val(grid[r][c])) === 0)) {
          continue
        }
        let keyStateForNext = cur[2]
        if (possKeys.includes(grid[r][c])) {
          keyStateForNext |= key2Val(grid[r][c])
          // console.log({oldKeys: cur[2], newKey: grid[r][c], keyStateForNext})
          if (keyStateForNext === allKeys) {return cur[3] + 1}
        }
        let hash = [r, c, keyStateForNext].join(",")
        if (!seen.has(hash)) {
          newStack.push([r, c, keyStateForNext, cur[3] + 1])
          seen.add(hash)
        }
      }
    }
    // console.log(newStack.length, seen)
    stack = [...newStack]
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

const keyTests = [
  { args: ["a"], out: 1 },
  { args: ["c"], out: 4 }
];

const lockTests = [
  { args: ["B"], out: 2 },
  { args: ["E"], out: 16 },
]

keyTests.forEach((t, i) => {
  let res = key2Val(...t.args);
  if (res !== t.out) {
    console.log(
      'keyTest', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('keyTest', i, 'was correct!')
  }
});

lockTests.forEach((t, i) => {
  let res = lock2Val(...t.args);
  if (res !== t.out) {
    console.log(
      'lockTest', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('lockTest', i, 'was correct!')
  }
});

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