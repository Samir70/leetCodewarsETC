/**
 * Version with trie was both faster and used less memory, 
 * but this was fast enough and was quicker to type.
 */
/**
 * @param {string[]} words
 */
var WordFilter = function (words) {
    this.preSuff = {}
    for (let w = 0; w < words.length; w++) {
        let word = words[w]
        for (let i = 0; i <= word.length; i++) {
            for (let j = 0; j <= word.length; j++) {
                let pre = word.slice(0, i), suf = word.slice(j)
                this.preSuff[pre + '-' + suf] = w
            }
        }
    }
    // console.log(this.preSuff)
};

/** 
 * @param {string} prefix 
 * @param {string} suffix
 * @return {number}
 */
WordFilter.prototype.f = function (prefix, suffix) {
    let out = this.preSuff[prefix + '-' + suffix]
    return out === undefined ? -1 : out
};

/** 
 * Your WordFilter object will be instantiated and called as such:
 * var obj = new WordFilter(words)
 * var param_1 = obj.f(prefix,suffix)
 */