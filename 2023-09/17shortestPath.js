/**
 * @param {number[][]} graph
 * @return {number}
 */
const key = (a, b) => [a, b].join(",")
var shortestPathLength = function (graph) {
  let n = graph.length, allVisited = 2 ** n - 1;
  if (n === 1) { return 0 }
  if (n === 2) { return 1 }
  // dp[mask][i] = number of steps taken to get to nodes in mask, finishing on i
  let dp = {}, stack = []
  for (let i = 0; i < n; i++) {
    dp[key(1 << i, i)] = 0
    stack.push([1 << i, i])
  }
  // console.log({ dp, stack, allVisited })
  while (stack.length > 0) {
    let newStack = [];
    while (stack.length > 0) {
      let [visited, lastNode] = stack.pop()
      for (let next of graph[lastNode]) {
        let bitMask = visited | (1 << next)
        let stepsSoFar = dp[key(visited, lastNode)]
        if (bitMask === allVisited) { return stepsSoFar + 1 }
        let currentBestStoppingHere = dp[key(bitMask, next)] || Infinity
        // console.log({ visited, lastNode, next, bitMask, stepsSoFar, currentBestStoppingHere })
        if (stepsSoFar + 1 < currentBestStoppingHere) {
          dp[key(bitMask, next)] = stepsSoFar + 1
          newStack.push([bitMask, next])
        }
      }
    }
    stack = [...newStack]
  }
  return "Shouldn't have got to this line!"
};
// uses too much memory for leetcode
// var shortestPathLength = function (graph) {
//   let n = graph.length;
//   if (n === 1) { return 0 }
//   if (n === 2) { return 1 }
//   let stack = [];
//   for (let i = 0; i < n; i++) {
//     stack.push({ location: i, visited: new Set([i]), steps: 0 })
//   }
//   while (stack.length > 0) {
//     let newStack = [];
//     while (stack.length > 0) {
//       let cur = stack.pop();
//       if (cur.visited.size === n) { return cur.steps }
//       for (let next of graph[cur.location]) {
//         let newVisited = new Set([...cur.visited])
//         newVisited.add(next)
//         newStack.push({location: next, visited:newVisited, steps: cur.steps + 1})
//       }
//     }
//     stack = [...newStack]
//   }
//   return "how did we get here?"
// };

const tests = [
  { args: [[[1, 2, 3], [0], [0], [0]]], out: 4 },
  { args: [[[1], [0, 2, 4], [1, 3, 4], [2], [1, 2]]], out: 4 },
  { args: [[[]]], out: 0 },
  { args: [[[6, 8], [2, 9], [1, 3, 5], [2, 6], [5], [2, 6, 4], [5, 3, 0, 7], [6], [0], [1]]], out: 12 },
];

tests.forEach((t, i) => {
  // if (i !== 0) { return }
  let res = shortestPathLength(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});