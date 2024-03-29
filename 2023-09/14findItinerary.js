// This verseion beat 91%
var findItinerary = function (tickets) {
  var graph = {}
  for (var [from, to] of tickets) {
    if (graph[from] === undefined) {
      graph[from] = []
    }
    if (graph[to] === undefined) {
      graph[to] = []
    }
    graph[from].push(to)
  }
  for (from in graph) {
    graph[from].sort().reverse();
  }
  // console.log(graph)
  let stack = ["JFK"]
  let route = []
  while (stack.length > 0) {
    let cur = stack[stack.length - 1]
    // console.log({ cur, stack, route })
    if (graph[cur].length > 0) {
      let dest = graph[cur].pop()
      stack.push(dest)
    } else {
      stack.pop()
      route.push(cur)
    }
  }
  return route.reverse()
};

var tests = [
  { args: [[["MUC", "LHR"], ["JFK", "MUC"], ["SFO", "SJC"], ["LHR", "SFO"]]], out: ["JFK", "MUC", "LHR", "SFO", "SJC"] },
  { args: [[["JFK", "SFO"], ["JFK", "ATL"], ["SFO", "ATL"], ["ATL", "JFK"], ["ATL", "SFO"]]], out: ["JFK", "ATL", "JFK", "SFO", "ATL", "SFO"] },
  { args: [[["JFK", "KUL"], ["JFK", "NRT"], ["NRT", "JFK"]]], out: ["JFK", "NRT", "JFK", "KUL"] },
  { args: [[["EZE", "AXA"], ["TIA", "ANU"], ["ANU", "JFK"], ["JFK", "ANU"], ["ANU", "EZE"], ["TIA", "ANU"], ["AXA", "TIA"], ["TIA", "JFK"], ["ANU", "TIA"], ["JFK", "TIA"]]], out: ["JFK", "ANU", "EZE", "AXA", "TIA", "ANU", "JFK", "TIA", "ANU", "TIA", "JFK"] }
];

tests.forEach((t, i) => {
  let res = findItinerary(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});
