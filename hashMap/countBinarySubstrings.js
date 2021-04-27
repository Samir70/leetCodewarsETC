// 17%, 73%
var countBinarySubstrings = function(s) {
    let tally = {0:0, 1:0}
    let prev = s[0];
    let out = 0;
    for (let cur of s) {
        if (cur === prev) {
            tally[cur]++
        } else {
            prev=cur
            tally[cur] = 1
        }
        let other = cur === '0' ? '1' : '0'
        if (tally[cur] <= tally[other]) {out++}
    }
    return out
};

// 100% on both
var countBinarySubstrings = function(s) {
    let [ans, prev, cur] = [0, 0, 1];
    for (let i = 1; i < s.length; i++) {
        if (s[i-1] === s[i]) {
            cur++
        } else {
            ans += Math.min(cur, prev)
            prev = cur;
            cur = 1
        }
    }
    return ans + Math.min(prev, cur)
};

const tests = [
  {in:"00110011", out:6},
  {in:"10101", out:4},
  {in:"1", out:0}
]
