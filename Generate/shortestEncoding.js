// Faster would be to use a set, initially full of all words, then remove each suffix. 
// (Feasable given max length of a word is 7)
// Fastest is to put words into trie, but backwards. so that suffixes are effectively removed.
// Then out = sum(word.length + 1 for each word)

var minimumLengthEncoding = function (words) {
    words.sort((a, b) => b.length - a.length);
    let starts = {};
    let out = 0;
    for (let w of words) {
        if (starts[w] === undefined) {
            out += w.length + 1;
            for (let i = 0; i < w.length; i++) {
                starts[w.slice(i)] = true
            }
        }
    }
    return out
};

const tests = [
    { words: ["time", "me", "bell", "t", "ell"], out: 12 },
    { words: ["t"], out: 2 },
    { words: ["me", "time"], out: 5 }
];

