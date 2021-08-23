var minTimeToType = function(word) {
    let cur = 'a';
    let count = 0;
    for (let c of word) {
        let pos = cur.charCodeAt(0) - 97
        let nextPos = c.charCodeAt(0) - 97
        let dist = Math.abs(pos - nextPos) % 26
        if (dist > 13) {dist = 26 - dist}
        count += dist + 1
        cur = c
    }
    return count
};

var maxMatrixSum = function(matrix) {
    let max = -Infinity, min = Infinity, negs = 0, sum = 0;
    let n = matrix.length
    for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            let val = matrix[r][c]
            if (val < 0) {
                sum -= val;
                negs++
                if (val > max) {max = val}
            } else {
                sum += val
                if (val < min) {min = val}
            }
        }
    }
    // console.log({sum, negs, max, min})
    if (min < -max) {max = -min}
    return negs % 2 ? sum + max + max : sum
};

// 196ms
const base = 10**9 + 7;
var countPaths = function(n, roads) {
    if (n === 1) {return 1}
   let graph = {}
    for (let [a, b, c] of roads) {
        if (graph[a] === undefined) {graph[a] = []}
        if (graph[b] === undefined) {graph[b] = []}
        graph[a].push([b, c])
        graph[b].push([a, c])
    }
    if (graph[0] === undefined) {return 0}
    let paths = 0, minCost = Infinity
    // console.log(graph) 
    let visited = Array(n).fill(false);
    let dist = Array(n).fill([Infinity, 0]); // [cost, ways to get here for that cost]
    let stack = new Set();
    stack.add(0);
    dist[0] = [0, 1];
    while (stack.size) {
        let cur, minDist = Infinity
        for (let s of stack) {
            if (visited[s]) {stack.delete(s); continue}
            if (dist[s][0] < minDist) {
                cur = s; minDist = dist[s][0]
            }
        }
        stack.delete(cur); visited[cur] = true;
        // console.log(cur, graph[cur], minDist)
        for (let [dest, cost] of graph[cur]) {
            if (!visited[dest]) {stack.add(dest)}
            let newCost = dist[cur][0] + cost;
            if (newCost < dist[dest][0]) {
                dist[dest] = [newCost, dist[cur][1]]
            } else if (newCost === dist[dest][0]) {
                dist[dest] = [newCost, (dist[dest][1] + dist[cur][1]) % base]
            }
        }
        // console.log({afterHandling:cur, stack, dist})
    }
    return dist[n-1][1]
};
