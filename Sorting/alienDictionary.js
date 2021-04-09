const isInOrder = (a, b, alpha) => {
    if (a === b) { return true }
    let len = Math.min(a.length, b.length)
    for (let i = 0; i < len; i++) {
        if (alpha[b[i]] < alpha[a[i]]) { return false }
        if (alpha[a[i]] < alpha[b[i]]) { return true }
        // other wise, letter i is the same in both words
    }
    // i === len; short word is prefix of long word
    return len === a.length
}
const isAlienSorted = (words, order) => {
    let alpha = {}
    for (let i = 0; i < 26; i++) {
        alpha[order[i]] = i
    }
    for (let i = 1; i < words.length; i++) {
        if (!isInOrder(words[i - 1], words[i], alpha)) { return false }
    }
    return true
}

const tests = [
    { words: ["hello", "leetcode"], order: "hlabcdefgijkmnopqrstuvwxyz", out: true },
    { words: ["word", "world", "row"], order: "worldabcefghijkmnpqstuvxyz", out: false },
    { words: ["apple", "app"], order: "abcdefghijklmnopqrstuvwxyz", out: false }
]

tests.forEach((t, i) => console.log(
    'test', i, isAlienSorted(t.words, t.order) === t.out
))