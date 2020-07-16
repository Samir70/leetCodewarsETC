const findAnagrams = (s, p) => {
    const sigP = {}, sigS = {}
    for (var c of p) {
        sigP[c] = (sigP[c] || 0) +1
    }
    var left = 0, right = p.length - 1;
    for (var c of s.slice(0, right+1)) {
        sigS[c] = (sigS[c] || 0) +1
    }
    var ans = [];
    const compareSigs = (sig1, sig2) => {
        for (var prop in sig1) {
            if (sig1[prop] !== sig2[prop] ) {return false}
        }
        return true
    }
    while (right<s.length) {
        console.log(sigP, sigS, compareSigs(sigP, sigS));
        if (compareSigs(sigP, sigS)) {ans.push(left)}
        sigS[s[left]]--;
        left++;
        right++;
        sigS[s[right]] = (sigS[s[right]] || 0) + 1
    }
    return ans
}

const tests = [
    {s:"cbaebabacd", p: "abc", out:[0, 6]}
];

tests.forEach(t => console.log(t.p, findAnagrams(t.s, t.p), 'should be', t.out))