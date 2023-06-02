const dist = (a, b) => {
  let dx = a[0] - b[0], dy = a[1] - b[1]
  let d = Math.sqrt(dx * dx + dy * dy)
  // console.log(`Dist from ${a} to ${b} is ${d}`)
  return d
}
var maximumDetonation = function (bombs) {
  let n = bombs.length;
  let nextBombs = Array(n)
  for (let i = 0; i < n; i++) { nextBombs[i] = [] }
  for (let a = 0; a < n; a++) {
    let bomb1 = bombs[a]
    nextBombs[a].push(a)
    for (let b = a + 1; b < n; b++) {
      let bomb2 = bombs[b]
      let d = dist(bomb1, bomb2)
      if (d <= bomb1[2]) {
        nextBombs[a].push(b)
        // console.log(`bomb ${bomb1} detonates ${bomb2}`)
      }
      if (d <= bomb2[2]) {
        // console.log(`bomb ${bomb2} detonates ${bomb1}`)
        nextBombs[b].push(a)
      }
    }
  }
  // console.log(nextBombs)
  let max = 0
  for (let i = 0; i < n; i++) {
    let detonated = Array(n).fill(0)
    let toDetonate = [i]
    while (toDetonate.length > 0) {
      let curBomb = toDetonate.pop();
      detonated[curBomb] = 1;
      for (let posNext of nextBombs[curBomb]) {
        if (detonated[posNext] === 0) {
          toDetonate.push(posNext)
        }
      }
    }
    max = Math.max(max, detonated.reduce((a, c) => a+c, 0))
  }
  return max
};

const tests = [
  { bombs: [[2, 1, 3], [6, 1, 4]], ans: 2 },
  { bombs: [[1, 1, 5], [10, 10, 5]], ans: 1 },
  { bombs: [[1, 2, 3], [2, 3, 1], [3, 4, 2], [4, 5, 3], [5, 6, 4]], ans: 5 }
];

tests.forEach((t, i) => {
  let mD = maximumDetonation(t.bombs);
  if (mD !== t.ans) {
    console.log(
      'test', i, mD, 'should be', t.ans, " got ", mD, "\n\n"
    )
  }
});