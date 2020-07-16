// 2n people to be sent to two different cities. 
// cost of travel is given in an array of length 2n
// for each person i, cost[i] is [cost to A, cost to B]

// started with the comparison in the sort function.
// was going to pick a person and random and split everyone else into those
// who are better candidates for A and better candidates for B
// then realised I may as well just sort

const twoCityMinCost = costs => {
    var mid = costs.length/2
    costs.sort((a, b) => (a[0]+b[1]) - (a[1]+b[0]) );
    var toA = costs.slice(0, mid), toB = costs.slice(mid);
    var costA = toA.reduce((a, b)=> a+b[0], 0), costB = toB.reduce((a, b) => a+b[1], 0)
    return costA+costB
}

/**
 * class Solution {
    public int twoCityMinCost(int[][] costs) {
        int N = costs.length / 2;
        int[][] dp = new int[N + 1][N + 1];
        for (int i = 1; i <= N; i++) {
            dp[i][0] = dp[i - 1][0] + costs[i - 1][0];
        }
        for (int j = 1; j <= N; j++) {
            dp[0][j] = dp[0][j - 1] + costs[j - 1][1];
        }
        for (int i = 1; i <= N; i++) {
            for (int j = 1; j <= N; j++) {
                dp[i][j] = Math.min(dp[i - 1][j] + costs[i + j - 1][0], dp[i][j - 1] + costs[i + j - 1][1]);
            }
        }
        return dp[N][N];
    }
}
 */


const rndInt = n => Math.floor(Math.random() * n)
const makeCosts = n => [...Array(n)].map(x => [rndInt(200), rndInt(200)])

const tests = [
    { costs: [[10, 20], [30, 200], [400, 50], [30, 20]], out: 110 },
    { costs: [[10, 20], [30, 200]] , out: 50 },
    {
        costs: [
            [94, 186], [76, 111], [178, 141], [62, 193], [96, 97], 
            [159, 185], [194, 114], [19, 114], [101, 79], [39, 120]
        ], 
        out: 906
    }
]

tests.forEach(t => console.log(twoCityMinCost(t.costs), t.out))