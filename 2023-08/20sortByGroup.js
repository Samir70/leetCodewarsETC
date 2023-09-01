/**
 * @param {number} n
 * @param {number} m
 * @param {number[]} group
 * @param {number[][]} beforeItems
 * @return {number[]}
 */

const makeEdge = (a, b) => `${a}->${b}`
var sortItems = function (n, m, group, beforeItems) {
  let groupID = m;
  let itemGraph = [], itemIndegree = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    if (group[i] === -1) {
      group[i] = groupID++
    }
    itemGraph.push([])
  }
  let groupGraph = [], groupIndegree = Array(groupID).fill(0)
  for (let i = 0; i < groupID; i++) {
    groupGraph.push([])
  }

  for (let cur = 0; cur < n; cur++) {
    for (let prev of beforeItems[cur]) {
      itemGraph[prev].push(cur)
      itemIndegree[cur]++
      if (group[prev] !== group[cur]) {
        groupGraph[group[prev]].push(group[cur])
        groupIndegree[group[cur]]++
      }
    }
  }

  // Tologlogical sort nodes in graph, return [] if a cycle exists.
  const topologicalSort = (graph, indegree) => {
    let visited = []
    let stack = []
    for (let i = 0; i < indegree.length; i++) {
      if (indegree[i] === 0) { stack.push(i) }
    }
    while (stack.length > 0) {
      let cur = stack.pop()
      visited.push(cur)
      for (neighbour of graph[cur]) {
        indegree[neighbour]--
        if (indegree[neighbour] === 0) { stack.push(neighbour) }
      }
    }
    return visited.length === graph.length ? visited : []
  }

  let itemOrder = topologicalSort(itemGraph, itemIndegree)
  let groupOrder = topologicalSort(groupGraph, groupIndegree)
  console.log({ itemGraph, itemIndegree, itemOrder })
  console.log({ groupGraph, groupIndegree, groupOrder })
  if (itemOrder.length === 0 || groupOrder.length === 0) { return [] }

  let orderedGroups = {}
  for (let item of itemOrder) {
    if (orderedGroups[group[item]] === undefined) {
      orderedGroups[group[item]] = []
    }
    orderedGroups[group[item]].push(item)
  }
  let answer = []
  for (let groupIndex of groupOrder) {
    answer = answer.concat(orderedGroups[groupIndex])
  }
  return answer
};

const tests = [
  { args: [8, 2, [-1, -1, 1, 0, 0, 1, 0, -1], [[], [6], [5], [6], [3, 6], [], [], []],], out: [6, 3, 4, 5, 2, 7, 1, 0] },
  { args: [8, 2, [-1, -1, 1, 0, 0, 1, 0, -1], [[], [6], [5], [6], [3], [], [4], []],], out: [] },
  { args: [5, 5, [2, 0, -1, 3, 0], [[2, 1, 3], [2, 4], [], [], []]], out: [3, 2, 4, 1, 0] }
];

tests.forEach((t, i) => {
  let res = sortItems(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});