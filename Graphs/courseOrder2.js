var findOrder = function (n, deps) {
    var noIns = new Set([...Array(n)].map((x, i) => i));
    var insOuts = {}
    var out = [];
    for ([a, b] of deps) {
        if (insOuts[a] === undefined) {
            insOuts[a] = {ins: new Set(), outs: new Set()}
        }
        if (insOuts[b] === undefined) {
            insOuts[b] = {ins: new Set(), outs: new Set()}
        }
        // must do b before a, so b points to a in graph
        insOuts[b].outs.add(a)
        insOuts[a].ins.add(b)
        noIns.delete(a)
        // console.log(a, b, noIns)
    }
    // console.log(insOuts)
    var stack = Array.from(noIns);
    var edgeCount = deps.length;
    while (stack.length > 0) {
        var c = stack.pop();
        out.push(c);
        if (insOuts[c]) {
            for (var dest of insOuts[c].outs) {
                insOuts[dest].ins.delete(c);
                if (insOuts[dest].ins.size === 0) {stack.push(dest)}
                edgeCount--
            }
        }
    }
    return edgeCount > 0 ? [] : out
};

/**
 * var findOrder = function(n, b2as) {
    let noIns = new Set([...Array(n)].map((x, i) => i));
    let ins = {}, outs = {}
    for (let [a, b] of b2as) {
        if (ins[a] === undefined) {ins[a] = 0} 
        if (outs[b] === undefined) {outs[b] = new Set() }
        ins[a]++;
        outs[b].add(a)
        noIns.delete(a)
    }
    let stack = Array.from(noIns);
    let edgecount = b2as.length;
    let out = [];
    while (stack.length) {
        let cur = stack.pop()
        out.push(cur)
        if (outs[cur] === undefined) {continue}
        for (let dest of outs[cur]) {
            ins[dest]--
            if (ins[dest] === 0) {stack.push(dest)}
            edgecount--
        }
    }
    return edgecount ? [] : out
};
 */

const tests = [
    { n: 2, prereq: [[1, 0]], out: [0, 1] },
    { n: 2, prereq: [[1, 0], [0, 1]], out: [] },
    { n: 4, prereq: [[1, 0], [2, 0], [3, 1], [3, 2]], out: [0, 1, 2, 3] },// or [0,2,1,3]
];

tests.forEach((t, i) => console.log(
    'test', i, findOrder(t.n, t.prereq), 'should be', t.out
))