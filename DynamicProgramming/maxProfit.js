var maxProfitBrute = prices => {
    var profits = [];
    prices.forEach((p, i) => {
        profits.push(
            Math.max(...prices.slice(i).map(x => x - p))
        )
    });
    return Math.max(...profits)
}

var memo = {}
var maxProfitRecursive = function (prices) {
    let key = prices.join(',');
    if (memo[key] !== undefined) { return memo[key] }
    if (prices.length === 1) {
        memo[key] = { buy: prices[0], sell: prices[0], profit: 0 }
        return memo[key]
    }
    if (prices.length === 2) {
        memo[key] = prices[0] < prices[1] ?
            { buy: prices[0], sell: prices[1], profit: prices[1] - prices[0] } :
            { buy: Infinity, sell: -1, profit: 0 }
        return memo[key]
    }
    let bestWithoutFirst = maxProfitRecursive(prices.slice(1));
    let bestWithoutLast = maxProfitRecursive(prices.slice(0, -1));
    // console.log(prices, bestWithoutFirst, bestWithoutLast);
    var bestBuy = Math.min(bestWithoutFirst.buy, prices[0]);
    bestWithoutFirst.buy = bestBuy;
    bestWithoutFirst.profit = bestWithoutFirst.sell - bestWithoutFirst.buy;
    var bestSell = Math.max(bestWithoutLast.sell, prices[prices.length - 1])
    bestWithoutLast.sell = bestSell;
    bestWithoutLast.profit = bestWithoutLast.sell - bestWithoutLast.buy;
    // console.log(prices, bestWithoutFirst, bestWithoutLast);
    memo[key] = bestWithoutLast.profit > bestWithoutFirst.profit ? bestWithoutLast : bestWithoutFirst
    return memo[key]
};

// quicker and shorter:
// plot the prices on graph and look for diff in peaks
// only need to keep track of minPrice and maxProfit
const maxProfitLinear = prices => {
    if (prices.length === 1) {return 0}
    var buy = 0, sell = 1;
    var profit = (b, s) => prices[s] - prices[b];
    // What if we have a descending sequence
    while (sell < prices.length && profit(buy, sell) <= 0) {
        buy++; sell++
    }
    if (sell === prices.length) {return 0}
    var bestSoFar = profit(buy, sell);
    while (sell < prices.length) {
        sell++;
        var p = profit(buy, sell);
        if (p > bestSoFar) {bestSoFar = p}
        if (prices[sell] < prices[buy]) {buy = sell}
        // console.log(buy,sell, bestSoFar)
    }
    return bestSoFar
}

const maxProfitL2 = prices => {
    if (prices.length < 2) {return 0}
    var maxProfit = 0, minBuy = prices[0];
    for (var p of prices) {
        maxProfit = Math.max(maxProfit, p-minBuy);
        minBuy = Math.min(minBuy, p)
    }
    return maxProfit
}

const tests = [
    { in: [7, 1, 5, 3, 6, 4], out: 5 },
    { in: [7, 2, 5, 3, 6, 4, 1, 3], out: 4 },
    { in: [7, 2, 5, 3, 6, 4, 1, 6], out: 5 },
    { in: [7, 6, 5, 4, 3, 2, 1], out: 0 }
];

tests.forEach(t => {
    memo = {}
    console.log(maxProfitBrute(t.in), maxProfitL2(t.in))
})
// console.log(memo)
var rndTest = []
for (var i = 0; i < 20000; i++) {
    rndTest.push(Math.floor(Math.random() * 300000) + 1)
}
console.log(maxProfitLinear(rndTest))
console.log(maxProfitL2(rndTest))
console.log(maxProfitBrute(rndTest))
// console.log(maxProfitRecursive(rndTest))