// given a string and an array of words(dictionary), split the string into words
// in as many ways as possible.
var wordBreak = function (s, wordDict, cache = new Map()) {
    if (cache.has(s)) { return cache.get(s); }
    // uncomment one of the console.logs and compare the number of logs
    // console.log('need result for', s)
    
    if (s.length === 0) {
        cache.set(s, []);
        return [];
    }
    
    const result = [];
    for (let word of wordDict) {
        const index = s.indexOf(word);
        if (index === 0) {
            const newStr = s.slice(word.length);
            // uncomment one of the console.logs and compare the number of logs
            // console.log('need result for', newStr)
            const values = wordBreak(newStr, wordDict, cache);
            if (values.length === 0 && newStr.length === 0)
                result.push(word);
            else {
                values.forEach(val => {
                    result.push(word + ' ' + val);
                });
            }
        }
    }

    cache.set(s, result);
    return result;
};

const tests = [
    {
        s: "catsanddog", wordDict: ["cat", "cats", "and", "sand", "dog"],
        out: ["cats and dog", "cat sand dog"]
    },
    {
        s: "catsandog", wordDict: ["cats", "dog", "sand", "and", "cat"],
        out: []
    },
    {
        s: "pineapplepenapple", wordDict: ["apple", "pen", "applepen", "pine", "pineapple"],
        out: ["pine apple pen apple", "pineapple pen apple", "pine applepen apple"]

    },
    // got wrong first time
    {
        s: "bb", wordDict: ["a", "b", "bbb", "bbbb"],
        out: ['b b'] // original gave 'bb' as a possible
        // needed to check pointer is at wordend before pushing sentence to out
    },
    // got TLE, note the single b
    {
        s: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        wordDict: ["a", "aa", "aaa", "aaaa", "aaaaa", "aaaaaa", "aaaaaaa", "aaaaaaaa", "aaaaaaaaa", "aaaaaaaaaa"],
        out: []
    }
];

tests.forEach((t, i) => console.log(
    'test', i, wordBreak(t.s, t.wordDict), 'should be ', t.out
))