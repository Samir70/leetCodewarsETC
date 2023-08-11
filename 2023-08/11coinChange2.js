/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 * Return the number of combinations of given coins that make up the amount. 
 * You may assume that you have an infinite number of each kind of coin.
 */
var change = function (amount, coins) {
  if (amount === 0) { return 1 }
  if (coins.length === 0) { return 0 }
  var dp = Array(amount + 1).fill(0).map(x => Array(coins.length))
  for (var i = 0; i < coins.length; i++) {
    dp[0][i] = 1;
    // only one way to make 0, inlcude no coins
  };
  for (i = 1; i <= amount; i++) {
    for (var c = 0; c < coins.length; c++) {
      var withCoin = i - coins[c] >= 0 ? dp[i - coins[c]][c] : 0
      var withoutCoin = c > 0 ? dp[i][c - 1] : 0
      dp[i][c] = withCoin + withoutCoin
    }
  }
  // console.log(dp)
  return dp[amount][coins.length - 1]
};

const tests = [
  { args: [5, [1, 2, 5]], out: 4 },
  { args: [3, [2]], out: 0 },
  { args: [10, [10]], out: 1 },
];

tests.forEach((t, i) => {
  let res = change(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});