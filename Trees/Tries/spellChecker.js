// Trie seemed too much
var spellchecker = function(wordlist, queries) {
    let original = new Set(wordlist)
    let caseChange = {}
    let vowelsWrong = {}
    for (let w of wordlist) {
        let lower = w.toLowerCase()
        if (caseChange[lower] === undefined) {caseChange[lower] = w}
        let noVowel = lower.replace(/[aeiou]/ig, '#')
        if (vowelsWrong[noVowel] === undefined) {vowelsWrong[noVowel] = w}
    }
    // console.log(original, caseChange, vowelsWrong)
    let out =[]
    for (let q of queries) {
        let lower = q.toLowerCase();
        let noVowels = lower.replace(/[aeiou]/ig, '#')
        if (original.has(q)) {
            out.push(q)
        } else if (caseChange[lower] !== undefined) {
            out.push(caseChange[lower])
        } else if (vowelsWrong[noVowels] !== undefined) {
            out.push(vowelsWrong[noVowels])
        } else {
            out.push('')
        }
    }
    return out
};