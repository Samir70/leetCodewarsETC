const findCircleNum = (m) => {
  let rows = m.length, cols = m[0].length;
  let gotJoined = new Set()
  for (let r = 0; r < cols; r++) {
    let foundDest = false;
    for (let c = r + 1; c < cols; c++) {
      if (m[r][c] === 1) {
        gotJoined.add(r)
        foundDest === false ? foundDest = c : m[foundDest][c] = 1
      }
    }
  }
  return rows - gotJoined.size
}

const tests = [
  { adjM: [[1, 1, 0], [1, 1, 0], [0, 0, 1]], out: 2 },
  { adjM: [[1, 0, 0], [0, 1, 0], [0, 0, 1]], out: 3 }
];

tests.forEach((t, i) => {
  let res = findCircleNum(t.adjM);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, " got ", res, "\n\n"
    )
  }
});