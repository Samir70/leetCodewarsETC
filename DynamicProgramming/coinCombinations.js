// recursion
const coinCombinationsRecursive = (coins, amount) => {
    console.log(coins, amount)
    if (amount === 0) {return 1}
    if (amount < 0) {return 0}
    if (coins.length === 0 && amount>0) {return 0}
    var coin = coins[0];
    var others = coins.slice(1)
    return coinCombinations(others, amount) + coinCombinations(coins, amount - coin)
}

// dp
const coinCombinations = (coins, amount) => {
    if (amount === 0) {return 1}
    if (coins.length === 0) {return 0}
    var dp = Array(amount+1).fill(0).map(x => Array(coins.length))
    for (var i = 0; i<coins.length; i++) {
        dp[0][i] = 1;
        // only one way to make 0, inlcude no coins
    };
    for (i = 1; i<=amount; i++) {
        for (var c = 0; c<coins.length; c++) {
            var withCoin = i-coins[c] >= 0 ? dp[i - coins[c]][c] : 0
            var withoutCoin = c > 0 ? dp[i][c-1] : 0
            dp[i][c] = withCoin + withoutCoin
        }
    }
    // console.log(dp)
    return dp[amount][coins.length-1]
}

const tests = [
    {coins:[1, 2, 5], amount:5, out:4},
    {coins:[2], amount:3, out:0},
    {coins:[], amount:0},
    {coins:[], amount:1}
]

tests.forEach((t, i) => console.log(
    'test', i, coinCombinations(t.coins, t.amount), 'should be', t.out
))