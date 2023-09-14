const wholepath = (path, g, n) => {
    if (path.length === n) { return path }
    var last = path[path.length - 1].split('-')[1];
    if (g[last] === undefined) { return false }
    var choices = g[last].filter(x => !path.includes(x));
    for (var c of choices) {
        var outcome = wholepath([...path, c], g, n);
        // console.log('outcome for', [...path, c], 'is', outcome)
        if (outcome !== false) { return outcome }
    }
    return false
}

var findItinerary = function (tickets) {
    var graph = {}
    for (var i in tickets) {
        var [from, to] = tickets[i]
        if (graph[from] === undefined) {
            graph[from] = []
        }
        graph[from].push(from + '-' + to + '-' + i)
    }
    for (from in graph) {
        graph[from].sort();
        // console.log(graph[from])
    }
    var journey = ['???-JFK'];
    for (var ticket of graph["JFK"]) {
        // console.log('starting search from', [...journey, ticket]);
        var outcome = wholepath([...journey, ticket], graph, tickets.length + 1)
        if (outcome !== false) return outcome.map(x => x.split('-')[1]).join(',').split(',')
    }
    return "oops! didn't seem to find a journey".split(' ')
};

var tests = [
    { in: [["MUC", "LHR"], ["JFK", "MUC"], ["SFO", "SJC"], ["LHR", "SFO"]], out: ["JFK", "MUC", "LHR", "SFO", "SJC"] },
    { in: [["JFK", "SFO"], ["JFK", "ATL"], ["SFO", "ATL"], ["ATL", "JFK"], ["ATL", "SFO"]], out: ["JFK", "ATL", "JFK", "SFO", "ATL", "SFO"] },
    { in: [["JFK", "KUL"], ["JFK", "NRT"], ["NRT", "JFK"]], out: ["JFK", "NRT", "JFK", "KUL"] },
    { in: [["EZE", "AXA"], ["TIA", "ANU"], ["ANU", "JFK"], ["JFK", "ANU"], ["ANU", "EZE"], ["TIA", "ANU"], ["AXA", "TIA"], ["TIA", "JFK"], ["ANU", "TIA"], ["JFK", "TIA"]], out: ["JFK", "ANU", "EZE", "AXA", "TIA", "ANU", "JFK", "TIA", "ANU", "TIA", "JFK"] }
];

tests.forEach((t, i) => {
    var result = findItinerary(t.in);
    console.log(result.join(','));
    console.log(t.out.join(','));
    console.log('test', i, findItinerary(t.in).join(',') === t.out.join(','))
})
