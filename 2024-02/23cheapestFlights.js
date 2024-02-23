// at most k cities in between src and dest
// if our longest journey is [src, 1, 2, ..., k, dest] then length of array is k+2
const { longTest } = require('./flightsTest')

// recursive
const findCheapestPrices = (n, flights, src, dest, k) => {
    var costToDest = []
    for (var f = 0; f < flights.length; f++) {
        var [a, b, c] = flights[f];
        if (a === src) {
            if (b === dest) {
                costToDest.push(c)
            } else {
                if (k > 0) {
                    var viaDetour = findCheapestPrices(n, flights, b, dest, k - 1);
                    if (viaDetour > -1) { costToDest.push(c + viaDetour) }
                }
            }
        }
    }
    return costToDest.length > 0 ? Math.min(...costToDest) : -1
}

// make adjacency matrix
const adjFromList = (n, arr) => {
    var adj = [...Array(n)].map(x => Array(n).fill(-1));
    for (var e of arr) {
        var [a, b, c] = e;
        adj[a][b] = c
    }
    return adj
}

const helper = (adj, journey, n, dest, price, k) => {
    var lastStop = journey.slice(-1)[0];
    // console.log('helping with journey', journey)
    if (lastStop === dest) { return price } // we got there! Otherwise...
    if (journey.length === k + 2) { return -1 } // can't add another city to journey
    var choices = [];
    for (var city = 0; city < n; city++) {
        var nextCost = adj[lastStop][city];
        if (nextCost === -1) { continue }
        if (journey.includes(city)) { continue }
        var outcome = helper(adj, [...journey, city], n, dest, price + nextCost, k)
        if (outcome !== -1) { choices.push(outcome) }
    }
    // console.log('choices', choices)
    return choices.length > 0 ? Math.min(...choices) : -1
}

const cheapestFlight = (n, flights, src, dest, k) => {
    adj = adjFromList(n, flights);
    if (k === 0) { return adj[src][dest] }
    var choices = [];
    for (var city = 0; city < n; city++) {
        var cost = adj[src][city];
        if (cost === -1) { continue }
        var outcome = helper(adj, [src, city], n, dest, cost, k);
        console.log('from src', city, outcome)
        if (outcome !== -1) { choices.push(outcome) }
    }
    return choices.length > 0 ? Math.min(...choices) : -1
}

const tests = [
    // { n: 3, flights: [[0, 1, 100], [1, 2, 100], [0, 2, 500]], src: 0, dest: 2, k: 0, out: 500 },
    // { n: 3, flights: [[0, 1, 100], [1, 2, 100], [2, 1, 500]], src: 0, dest: 2, k: 0, out: -1 },
    // { n: 3, flights: [[0, 1, 100], [1, 2, 100], [0, 2, 500]], src: 0, dest: 2, k: 1, out: 200 },
    // { n: 4, flights: [[0, 1, 1], [0, 2, 5], [1, 2, 1], [2, 3, 1]], src: 0, dest: 3, k: 1, out: 6 },
    longTest
]

tests.forEach((t, i) => console.log('test', i, cheapestFlight(t.n, t.flights, t.src, t.dest, t.k), 'should be', t.out))