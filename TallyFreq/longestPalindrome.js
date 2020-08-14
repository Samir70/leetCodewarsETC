var longestPalindrome1 = function(s) {
    let tally = new Map();
    for (var c of s) {
        tally.set(c, (tally.get(c) || 0) + 1)
    }
    // console.log(tally)
    var out = 0;
    for (let [key, value] of tally) {
        out += value%2 === 1 ? value - 1 : value
    }
    return out < s.length ? out + 1 : out
};

// faster was:
const longestPalindrome = s => {
    let singles = new Set();
    var pairCount = 0;
    for (var c of s) {
        if (singles.has(c)) {
            pairCount++;
            singles.delete(c)
        } else {
            singles.add(c)
        }
    }
    let longest = pairCount*2
    return longest < s.length ? longest+1 : longest
}

const tests = [
    {in:'abccccdd', out:7},
    {in:'ccccdd', out:6},
    {in:'ccccddd', out:7}
];
tests.forEach(t => console.log(
    t.in, longestPalindrome(t.in), 'should be', t.out
))