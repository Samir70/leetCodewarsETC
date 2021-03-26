class LetterCount {
    constructor(currentWord, i) {
        this.currentWord = currentWord+'-'+i;
        this.maxCount = 0;
        this.currentCount = 0;
    }
    tallyLetterOf(fromWord, i) {
        let key = [fromWord, i].join('-')
        if (key === this.currentWord) {
            this.currentCount++
            // console.log(this.currentWord, this.currentCount)
        } else {
            this.currentWord = key;
            this.currentCount = 1
        }
        this.maxCount = Math.max(this.maxCount, this.currentCount)
    }
}

const tallyOneWord = w => {
    let tally = {}
    for (let c of w) {
        tally[c] = (tally[c] || 0) + 1
    }
    return tally
}
const wordSubsets = (arr, brr) => {
    let tally = {}
    for (let i = 0; i < brr.length; i++) {
        let w = brr[i];
        for (let c of w) {
            if (tally[c] === undefined) { tally[c] = new LetterCount(w, i) }
            tally[c].tallyLetterOf(w, i)
        }
    }
    // console.log(tally)
    let out = []
    for (let w of arr) {
        let curTally = tallyOneWord(w);
        // console.log(curTally)
        let good = true;
        for (let c in tally) {
            // console.log(w, c, curTally[c], tally[c] && tally[c].maxCount)
            if (curTally[c] === undefined || curTally[c] < tally[c].maxCount) {
                good = false;
                break
            }
        }
        if (good) { out.push(w) }
    }
    return out
}

const tests = [
    { a: ['abcdc', 'ccdfg', 'aaacbceede'], b: ['abcde', 'aabcd', 'aaabccdeee'] },
    { a: ["amazon", "apple", "facebook", "google", "leetcode"], b: ["ec", "oc", "ceo"] },
    { a: ["amazon", "apple", "facebook", "google", "leetcode"], b: ["lo", "eo"] },
    { a: ["cccbb", "aacbc", "bbccc", "baaba", "acaba"], b: ["cb", "b", "cb"] }
]

tests.forEach((t, i) => console.log(
    'test', i, wordSubsets(t.a, t.b)
))