// 392ms beats 18%
const lengthOfLongestSubstringOld = str => {
    let idxLastSeen = {}, max = 0;
    let newStart = -1
    for (let i = 0; i < str.length; i++) {
        let prev = idxLastSeen[str[i]] === undefined ? newStart : idxLastSeen[str[i]]
        if (idxLastSeen[str[i]] !== undefined) {
            newStart = Math.max(newStart, idxLastSeen[str[i]])
        }        
        // console.log(str[i], i, prev, 'newStart', newStart)
        var len = i - Math.max(prev, newStart)
        idxLastSeen[str[i]] = i;
        if (len > max) {max = len}
    }
    return max
}

// 168ms beats 35%
var lengthOfLongestSubstring = function(s) {
    if (s==='') {return 0}
    let hash = new Set();
    hash.add(s[0])
    let left = 0, right = 1;
    let longest = 1;
    while (right < s.length) {
        if (!hash.has(s[right])) {
            hash.add(s[right])
            right++
            longest = Math.max(longest, hash.size)
        } else {
            while (hash.has(s[right])) {
                hash.delete(s[left])
                left++
            }
        } 
    }
    return longest
};

const tests = [
    { str: "abcabcbb", out: 3},
    { str: "bbbbb", out: 1},
    { str: "pwwkew", out: 3},
    { str: "", out: 0},
    { str: "aab", out: 2},
    { str: "abba", out: 2}
];

tests.forEach((t, i) => console.log(
    'test', i, lengthOfLongestSubstring(t.str) === t.out
))