/**
 * 
 * @param {integer} n 
 * @param {array} connections 
 * @returns 
 */
var criticalConnections = function (n, connections) {
    let adjList = {}
    for (let i = 0; i < n; i++) {
        adjList[i] = []
    }
    for (let [a, b] of connections) {
        adjList[a].push(b); adjList[b].push(a)
    }
    let disc = Array(n); low = Array(n);
    let out = [];
    let time = 1;
    const dfs = (cur, prev) => {
        disc[cur] = time; low[cur] = time;
        time++;
        for (let next of adjList[cur]) {
            if (!disc[next]) {
                dfs(next, cur);
                low[cur] = Math.min(low[cur], low[next])
            } else if (next !== prev) {
                low[cur] = Math.min(low[cur], disc[next])
            }
            if (low[next] > disc[cur]) {
                out.push([cur, next])
            }
        }
    }
    dfs(0, -1);
    return out
};

const tests = [
    { n: 4, edges: [[0, 1], [1, 2], [2, 0], [1, 3]], out: [[1, 3]] }
];

tests.forEach((t, i) => console.log(
    'test', i, criticalConnections()
))