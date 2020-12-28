var averageWaitingTimeOld = function(customers) {
    if (customers.length === 0) {return 0}
    let totalTime = customers[0][1];
    let freeAt = customers[0][0] + customers[0][1]
    // console.log(customers[0], totalTime, freeAt)
    for (let i = 1; i < customers.length; i++) {
        let c = customers[i]
        let waitToGiveOrder = freeAt - c[0]
        if (waitToGiveOrder < 0) {waitToGiveOrder = 0}
        totalTime += waitToGiveOrder + c[1]
        let startOrder = Math.max(freeAt, c[0])
        freeAt = startOrder + c[1]
        // console.log(c, totalTime, freeAt)
    }
    return totalTime/(customers.length)
};

// faster:
var averageWaitingTime = function(customers) {
    let cur = 0, totalWait = 0;
    for (let c of customers) {
        cur = Math.max(cur, c[0]) + c[1]
        totalWait += cur - c[0]
    }
    return totalWait/customers.length
};

const test = [
    { customers: [[1, 2], [2, 5], [4, 3]], out: 5.0 },
    { customers: [[5, 2], [5, 4], [10, 3], [20, 1]], out: 3.25 },
    { customers: [[2, 3], [6, 3], [7, 5], [11, 3], [15, 2], [18, 1]], out: 4.16667 }
]

test.forEach((t, i) => console.log(
    'test', i, averageWaitingTime(t.customers), 'should be', t.out
))