const countConsistentStrings = (allowed, words) => {
    let hash = new Map()
    for (let a of allowed) {hash.set(a, true)}
    let count = 0;
    for (let w of words) {
        if ([...w].every(x => hash.get(x))) {count++}
    }
    return count
};

// a little faster
const countConsistentStrings = (allowed, words) => {
    let hash = new Map()
    for (let a of allowed) {hash.set(a, true)}
    let count = words.length;
    for (let w of words) {
        for (let c of w) {
            if (!hash.get(c)) {count--; break}
        }
    }
    return count
};

const tests = [
    { allowed: "ab", words: ["ad", "bd", "aaab", "baa", "badab"], Output: 2 },
    { allowed: "abc", words: ["a", "b", "c", "ab", "ac", "bc", "abc"], Output: 7 }
]

tests.forEach(t => console.log(
    countConsistentStrings(t.allowed, t.words)
))