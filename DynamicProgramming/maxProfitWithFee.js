// stack overflow
var maxProfit = function(prices, fee) {
    const memo = {}
    const dp = (own, day) => {
        let key = [own, day].join(',');
        if (memo[key] !== undefined) {return memo[key]}
        let extraProfit = 0
        if (day === prices.length - 1) {
            extraProfit = own === 0 ? 0 : Math.max(0, prices[day] - own - fee)
        } else {
            extraProfit = own > 0 ? 
                Math.max(dp(own, day+1), prices[day] - own - fee + dp(0, day+1), 0) : 
                Math.max(dp(0, day+1), dp(prices[day], day+1), 0)
        }    
        // console.log(own, day, extraProfit)
        memo[key] = extraProfit
        return memo[key]
    }
    return dp(0, 0, 0)
};

// state switching solution:
var maxProfit = function(prices, fee) {
    const n = prices.length;
    let buying = Array(n), selling = Array(n);
    selling[0] = 0;
    buying[0] = -prices[0]
    for (let i = 1; i < n; i++) {
        buying[i] = Math.max(buying[i-1], selling[i-1] - prices[i]);
        selling[i] = Math.max(selling[i - 1], buying[i - 1] + prices[i] - fee)
    }
    return selling[n - 1]
};

const tests = [
    { prices: [1, 4, 6, 2, 8, 3, 10, 14], fee: 3, out: 13 },
    { prices: [1, 3, 2, 8, 4, 9], fee: 2, out: 8 },
    { prices: [1, 3, 7, 5, 10, 3], fee: 3, out: 6 },
    { prices: [1, 3, 7, 5, 10, 3, 4, 4, 6, 7, 2, 12, 4, 9, 8, 7, 6, 5, 4, 5, 7, 7], fee: 1, out: 27 }
];

tests.forEach((t, i) => console.log(
    'test', i, maxProfit(t.prices, t.fee) === t.out
))