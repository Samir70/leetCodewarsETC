// state machine
// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/discuss/149383/Easy-DP-solution-using-state-machine-O(n)-time-complexity-O(1)-space-complexity

var maxProfit = function (prices) {
    if (prices.length < 2) {return 0}
    // four states needed for the machine, out will be the the value in state 4 
    // so set that to zero, since that is the profit to beat
    // we are in debt are buying first stock so s1 is negative
    let s1 = -prices[0], [s2, s3, s4] = [-Infinity, -Infinity, 0]
    for (var i = 1; i < prices.length; i++)  {
        s1 = Math.max(s1, -prices[i]);
        s2 = Math.max(s2, prices[i] + s1);
        s3 = Math.max(s3, s2-prices[i]); // nb:this is s1 again if you don't buy
        s4 = Math.max(s4, prices[i] + s3);
        // console.log(prices[i], [s1, s2, s3, s4])
    }
    return s4
};

const tests = [
    { in: [3, 3, 5, 0, 0, 3, 1, 4], out: 6 },
    { in: [1, 2, 3, 4, 5], out: 4 },
    { in: [7, 6, 4, 3, 1], out: 0 }
]

tests.forEach((t, i) => console.log(
    'test', i, maxProfit(t.in), 'should be', t.out
))