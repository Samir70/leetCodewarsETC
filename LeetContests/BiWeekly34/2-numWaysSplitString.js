/**
 * how many ways can binary string s be split into 3 parts 
 * so that each part has the same number of ones?
 */

/**
 * need two break points, how many places can point A be in and how many ways for point B?
 * 10101
 * need a single one in each part
 * breakA can be before index 1 or 2; breakB can be before index3 or 4
 * two choices each break point, so 2x2 = 4 ways
 * 
 * work out number of choices by finding index of last one of one substring and first one of next
 * 
 */
const numWays = s => {
    if (s.length < 3) { return 0 }
    let numberOnes = 0;
    for (let c of s) {
        if (c === '1') {
            numberOnes++
        }
    }
    if (numberOnes % 3 !== 0) { return 0 }
    if (numberOnes === 0) {
        // can choose any two break points, but may have a choice of almost 10^5
        let choices = s.length - 1
        if (choices % 2 === 0) {
            return (choices/2)*(choices - 1)
        } else {
            return ((choices - 1)/2)*choices
        }
    }
    const eachPart = numberOnes / 3
    // an array to store [lastOne, firstOne, lastOne, firstOne]
    // of the three substrings
    let onePos = []
    let i = 0;
    while (i < s.length) {
        let oneCount = 0;
        while (oneCount < eachPart) {
            if (s[i] === '1') {
                oneCount++
            }
            i++
        }
        onePos.push(i - 1);
        while (s[i] === '0') { i++ }
        onePos.push(i)
    }
    console.log(onePos);
    let [a, b, c, d] = onePos.slice(0, 4);
    return (b - a) * (d - c)
}

// Leetcode wanted answer mod 10^9 + 7, but that doesn't seem necesasry by this method
// one pass:
/**
 * class Solution:
    def numWays(self, s: str) -> int:
        n,ones = len(s),[]
        for i,val in enumerate(s):
            if val == '1':
                ones.append(i)
        total = len(ones)
        if total == 0:
		    # ref: https://en.wikipedia.org/wiki/Combination
			# combination of selecting 2 places to split the string out of n-1 places
            return ((n-1)*(n-2)//2) % (10**9+7) 
        if total % 3 != 0:
            return 0
        target = total // 3
        return (ones[target]-ones[target-1])*(ones[target*2]-ones[target*2-1])%(10**9+7)
 */

const tests = [
    { in: "10101", out: 4 },
    { in: "1001", out: 0 },
    { in: "0000", out: 3 },
    { in: "100100010100110", out: 12 }
];

tests.forEach((t, i) => console.log(
    'test', i, numWays(t.in) === t.out
))