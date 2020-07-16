// at most k cities in between src and dest
// if our longest journey is [src, 1, 2, ..., k, dest] then length of array is k+2
const { longTest } = require('./flightsTest')

// make adjacency matrix
const adjFromList = (n, arr) => {
    var adj = [...Array(n)].map(x => Array(n).fill(Infinity));
    for (var e of arr) {
        var [a, b, c] = e;
        adj[a][b] = c
    }
    return adj
}

const cheapestFlight = (n, flights, src, dest, k) => {
    adj = adjFromList(n, flights);
    var costFromSrc = [...adj[src]]
    // if k>0, then we can take more flights
    // otherwise: adj already contains the cost to get to source
    while (k > 0) {
        var nextCost = [...costFromSrc]
        // routes to extend
        var cities = [];
        for (var i = 0; i < n; i++) {
            if (costFromSrc[i] < Infinity && i !== dest) { cities.push(i) }
        }
        // console.log('i will extend', cities)
        while (cities.length > 0) {
            var city = cities.pop()
            // console.log('it cost', costFromSrc[city], 'to get to ', city);
            // console.log('travelling from', city, 'gets us here:', adj[city])
            var totalCosts = adj[city].map(x => x > -1 ? x + costFromSrc[city] : -1)
            for (i = 0; i < n; i++) {
                var c = Math.min(costFromSrc[i], totalCosts[i], nextCost[i]);
                nextCost[i] = c
            }
            // console.log('nextCosts:', nextCost)
        }
        costFromSrc = [...nextCost]
        k--
    }
    return costFromSrc[dest] < Infinity ? costFromSrc[dest] : -1
}

const tests = [
    { n: 3, flights: [[0, 1, 100], [1, 2, 100], [0, 2, 500]], src: 0, dest: 2, k: 0, out: 500 },
    { n: 3, flights: [[0, 1, 100], [1, 2, 100], [2, 1, 500]], src: 0, dest: 2, k: 0, out: -1 },
    { n: 3, flights: [[0, 1, 100], [1, 2, 100], [0, 2, 500]], src: 0, dest: 2, k: 1, out: 200 },
    { n: 4, flights: [[0, 1, 1], [0, 2, 5], [1, 2, 1], [2, 3, 1]], src: 0, dest: 3, k: 1, out: 6 },
    { n: 3, flights: [[0, 1, 2], [1, 2, 1], [2, 0, 10]], src: 1, dest: 2, k: 1, out: 1 },
    longTest
]

tests.forEach((t, i) => console.log('test', i, cheapestFlight(t.n, t.flights, t.src, t.dest, t.k), 'should be', t.out))