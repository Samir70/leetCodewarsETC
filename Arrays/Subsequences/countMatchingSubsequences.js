// beats 86%; 30% on mem
const isSubSeq = (sub, placeList) => {
    let i = -1;
    // console.log(sub, placeList)
    for (let s of sub) {
        if (placeList[s] === undefined) {return false}
        let locs = placeList[s].locations, n = placeList[s].next;
        while (locs[n] !== undefined && locs[n] <= i) {n++}
        if (locs[n] === undefined) {
            return false
        } else {
            i = locs[n]
        } 
    }
    return true
}

const categorise = word => {
    let out = {}
    for (i = 0; i < word.length; i++) {
        let c = word[i]
        if (out[c] === undefined) {out[c] = {locations: [], next: 0}}
        out[c].locations.push(i)
    }
    return out
}

const numMatchingSubseq = (s, words) => {
    let count = 0;
    let pList = categorise(s);
    for (let w of words) {
        if (isSubSeq(w, pList)) { count++ }
    }
    return count
}

const bigstr = Array(49000).fill('m') + 'u'
const lottaWords = Array(4000).fill('mu')

const tests = [
    { s: "abcde", words: ["a", "bb", "acd", "ace"], out: 3 },
    { s: "dsahjpjauf", words: ["ahjpjau", "ja", "ahbwzgqnuk", "tnmlanowax"], out: 2 },
    { s: bigstr, words: lottaWords, out: 4000 }
]

tests.forEach((t, i) => console.log(
    'test', i, numMatchingSubseq(t.s, t.words) === t.out
))