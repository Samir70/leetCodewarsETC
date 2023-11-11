/**
 * @param {number[][]} adjacentPairs
 * @return {number[]}
 */
var restoreArray = function (adjacentPairs) {
  let neighbours = {}, oneNeighbour = new Set()
  for (let [a, b] of adjacentPairs) {
    if (neighbours[a] === undefined) { neighbours[a] = [] }
    if (neighbours[b] === undefined) { neighbours[b] = [] }
    if (oneNeighbour.has(a)) {
      oneNeighbour.delete(a)
    } else {
      oneNeighbour.add(a)
    }
    if (oneNeighbour.has(b)) {
      oneNeighbour.delete(b)
    } else {
      oneNeighbour.add(b)
    }
    neighbours[a].push(b)
    neighbours[b].push(a)
  }
  // console.log({neighbours, oneNeighbour})
  let start = [...oneNeighbour][0], seen = new Set()
  let stack = [start], originalArray = []
  while (stack.length > 0) {
    let cur = stack.pop()
    originalArray.push(cur);
    seen.add(cur)
    for (let next of neighbours[cur]) {
      if (seen.has(next)) { continue }
      stack.push(next)
    }
  }
  return originalArray
};

const tests = [
  { args: [[[2, 1], [3, 4], [3, 2]]], out: [1, 2, 3, 4] },
  { args: [[[4, -2], [1, 4], [-3, 1]]], out: [-2, 4, 1, -3] },
  { args: [[[100000, -100000]]], out: [100000, -100000] },
];

tests.forEach((t, i) => {
  let res = restoreArray(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});