/**
 * given the edges of a directed graph, 
 * return the minimum number of vertices needed as starting points
 * to visit every vertiex
 */

// Assume need all vertices, then cross out those which have an edge pointing to them
var findSmallestSetOfVertices = function (n, edges) {
    var includeInOut = Array(n).fill(true);
    for (let e of edges) {
        includeInOut[e[1]] = false
    }
    let out = [];
    // console.log(includeInOut)
    for (let i = 0; i < n; i++) {
        if (includeInOut[i]) { out.push(i) }
    }
    return out
};

const tests = [
    { n: 6, edges: [[0, 1], [0, 2], [2, 5], [3, 4], [4, 2]], out: [0, 3] },
    { n: 5, edges: [[0, 1], [2, 1], [3, 1], [1, 4], [2, 4]], out: [0, 2, 3] }
];

tests.forEach((t, i) => console.log(
    'test', i, findSmallestSetOfVertices(t.n, t.edges), 'should be', t.out
))