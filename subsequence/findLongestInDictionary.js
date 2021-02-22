// find the longest subsequence of string s which is a word of d
// if two of same length, give first in alphabet
var findLongestWord = function(s, d) {
    let tally = {}
    for (let i = 0; i < s.length; i++) {
        let c = s[i];
        if (tally[c] === undefined) {tally[c] = []}
        tally[c].push(i)
    }
    console.log(tally);
    let out = '';
    for (let word of d) {
        let i = -1;
        let found = ''
        for (let w of word) {
            if (tally[w] === undefined) {break}
            i = tally[w].find(x => x > i)
            if (i === undefined) {break}
            found += w
        }
        if (found === word) {
            if (found.length > out.length) {
                out = found
            } else if (found.length === out.length && found < out) {
                out = found
            }
        }
    }
    return out
};

// Making the tally doesn't save time, even with binary search added.
// seanpgallivan
var findLongestWord = function(S, D) {
    let ans = ""
    for (let word of D) {
        let a = word.length, b = ans.length
        if (a < b || (a === b && word > ans)) continue
        let pos = -1
        for (let char of word) {
            pos = S.indexOf(char, pos + 1)
            if (pos === -1) break
        }
        if (pos !== -1) ans = word
    }
    return ans
};

/**
 * test:
 * s = "abpcplea", d = ["ale","apple","monkey","plea"]
 * Output: "apple"
 */