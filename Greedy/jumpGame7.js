// beat 100%, I thought it might TLE
var canReach = function(s, minJump, maxJump) {
    let i = s.length - 1;
    if (s[i] === '1') {return false}
    let winners = [i];
    while (i > 0) {
        i--;
        if (s[i] === '1') {continue}
        let r = winners.length - 1;
        while (r >= 0 && winners[r] - i < minJump) {r--}
        if (r >= 0 && winners[r] - i <= maxJump) {winners.push(i)}
        // console.log(winners)
    }
    return winners[winners.length - 1] === 0
};

/*
from lee215
def canReach(self, s, minJ, maxJ):
        dp = [c == '0' for c in s]
        pre = 0
        for i in xrange(1, len(s)):
            if i >= minJ: pre += dp[i - minJ]
            if i > maxJ: pre -= dp[i - maxJ - 1]
            dp[i] &= pre > 0
        return dp[-1]
*/

const test = [
  {s: "011010", minJump: 2, maxJump: 3, out: true},
  {s: "01101110", minJump: 2, maxJump: 3, out: false},
  {s: "00000110", minJump: 2, maxJump: 3, out: true},
  {s: "00111010", minJump: 3, maxJump: 5, out: false}
]
