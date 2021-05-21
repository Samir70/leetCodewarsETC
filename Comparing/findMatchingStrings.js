const getSig = str => {
    let tally = {}
    for (let i = 0; i < str.length; i++) {
        let c = str[i]
        if (tally[c] === undefined) {tally[c] = []}
        tally[c].push(i)
    }
    let out = []
    for (let key in tally) {
        out.push(tally[key].join('-'))
    }
    return out.sort((a, b) => a - b)
}
const matchSigs = (a, b) => {
    if (a.length !== b.length) {return false}
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {return false}
    }
    return true
}

var findAndReplacePattern = function(words, pattern) {
    let target = getSig(pattern)
    let out = []
    for (let w of words) {
        // console.log(getSig(w))
        if (matchSigs(target, getSig(w))) {out.push(w)}
    }
    return out
};

/**
 * Normalise and compare
 * This solution is referred from @lee215's post. 
 * In this solution, we can convert each string to a base / standard pattern and then compare them. 
 * Here, we are converting all occurences of first found character to a, 
 * second all occurences of second found character to b, then c and so on...

For eg. Consider the words "mmnpoq" and "ppqqqz". 
We can convert these into - "aabcde" and "aabbbc". 
Since they are not equal, we can say both these words don't match.
Similarly, the words "mnpqrr" and "xyzabb" can be converted into "abcdee" and "abcdee" respectively.
 Since they are equal, we say that these two words match.
 */