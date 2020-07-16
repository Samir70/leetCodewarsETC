let squares = Array.from({length: 10}, (_,i) => (i+1)**2)

function genGraph(n) {
  return Array.from({length: n+1}, (_,i) => {
    if (i == 0) return []
    let arr = []
    squares.forEach(x => i < x && x - i != i && x - i <= n && arr.push(x - i))
    return new Set(arr)
  })
}

function subTry(n, curPath, graph) {
  if (curPath.length == n) return curPath
  let last = curPath[curPath.length - 1]
  let neighbors = [...graph[last]].sort((a, b) => graph[a].size - graph[b].size)
  let result = false
  graph = graph.map(x => new Set(x))
  for (let n of neighbors) graph[n].delete(last)
  return neighbors.some(x => result = subTry(n, curPath.concat(x), graph)) && result
}

function square_sums_row(n) {
  if (n < 15 || (n >= 18 && n < 23) || n == 24) return false
  let graph = genGraph(n)
  let vertices = Array.from({length: n}, (_,i) => i+1).sort((a,b) => graph[a].size - graph[b].size)
  let result = false
  return vertices.some(x => result = subTry(n, [x], graph)) && result
}

[...Array(50).keys()].map(x=>x+100).forEach(x=>console.log(x+':'+square_sums_row(x)))