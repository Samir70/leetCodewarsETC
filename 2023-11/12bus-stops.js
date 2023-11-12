/**
 * @param {number[][]} routes
 * @param {number} source
 * @param {number} target
 * @return {number}
 */
var numBusesToDestination = function (routes, source, target) {
  if (source === target) { return 0 }
  let locs2buses = {}
  for (let r = 0; r < routes.length; r++) {
    for (let loc of routes[r]) {
      if (locs2buses[loc] === undefined) { locs2buses[loc] = [] }
      locs2buses[loc].push(r)
    }
  }
  if (locs2buses[target] === undefined) { return -1 }
  let stack = locs2buses[source];
  let visitedStops = new Set(), ridden = new Set();
  let busCounter = 1;
  // console.log({ locs2buses, stack })
  while (stack.length > 0) {
    let newStack = []
    while (stack.length > 0) {
      let cur = stack.pop()
      ridden.add(cur)
      for (let stop of routes[cur]) {
        if (stop == target) { return busCounter }
        if (visitedStops.has(stop)) { continue }
        visitedStops.add(stop)
        for (let bus of locs2buses[stop]) {
          if (!ridden.has(bus)) { newStack.push(bus) }
        }
      }
    }
    stack = [...newStack]
    busCounter++
  }
  return -1
}


const { bigTest } = require("./12bigTest")
const tests = [
  { args: [[[1, 2, 7], [3, 6, 7]], 1, 6], out: 2 },
  { args: [[[1, 7], [3, 5]], 5, 5], out: 0 },
  { args: [[[7, 12], [4, 5, 15], [6], [15, 19], [9, 12, 13]], 15, 12], out: -1 },
  { args: [[[7, 12], [4, 5, 15], [6, 5, 26, 1], [15, 19], [9, 12, 13, 1, 7]], 15, 12], out: 3 },
  { args: bigTest, out: 3 },
];

tests.forEach((t, i) => {
  let res = numBusesToDestination(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});