// graph[i] is a list of all nodes j for which the edge (i, j) exists.
// graph is DAG

var allPathsSourceTarget = function (graph) {
    if (graph[0] === []) { return [] }
    var target = graph.length - 1;
    var out = []
    var findPath = (g, journey, lastStop) => {
        if (lastStop === target) {
            out.push(journey);
            return
        }
        for (var next of g[lastStop]) {
            findPath(g, [...journey, next], next);
        }
    }
    for (var firstStop of graph[0]) {
        findPath(graph, [0, firstStop], firstStop)
    }
    return out
};

const tests = [
    { in: [[4, 3, 1], [3, 2, 4], [3], [4], []], out: [[0, 4], [0, 3, 4], [0, 1, 3, 4], [0, 1, 2, 3, 4], [0, 1, 4]] },
    { in: [[1, 2], [3], [3], []], out: [[0, 1, 3], [0, 2, 3]] },
    { in: [[1, 2, 3, 4], [2], [3], [4], []], out: [[0, 1, 2, 3, 4], [0, 2, 3, 4], [0, 3, 4], [0, 4]] },
    { in: [[1, 2, 3, 4], [2], [4], [], [3]], out: [[0, 1, 2, 4], [0, 2, 4], [0, 4]] },
    { in: [[1, 3], [3], [3], []], out: [[0, 1, 3], [0, 3]] }

];

tests.forEach((t, i) => console.log(
    'test', i, allPathsSourceTarget(t.in), 'should be', t.out
))