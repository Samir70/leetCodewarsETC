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


// TLEs
var countPaths = function(n, roads) {
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
    
    const findPaths = (route, lastStop, cost) => {
        // console.log({route, lastStop, cost})
        if (lastStop === n - 1) {
            if (cost < minCost) {
                paths = 1;
                minCost = cost
            } else if (cost === minCost) {
                paths++
                if (paths === 10**9 + 7) {paths = 0}
            }
            // console.log(paths)
            return null
        }
    
        for (let [nex, cos] of graph[lastStop]) {
            if (route.indexOf(nex) !== -1) {continue}
            findPaths([...route, lastStop], nex, cost+cos)
        }
    }
    
    for (let [next, cost] of graph[0]) {
        findPaths([0], next, cost)
    }
    return paths
};