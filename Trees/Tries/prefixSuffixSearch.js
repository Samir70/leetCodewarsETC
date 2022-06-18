/**
 * https://leetcode.com/problems/prefix-and-suffix-search/submissions/
 * @param {string[]} words
 */
class trieNode {
    constructor(name) {
        this.key = name;
        this.foundAt = []
        this.children = {};
        this.wordEnd = false
    }
}

class Trie {
    constructor() {
        this.head = {
            val: null,
            children: {}
        }
    }

    insert(word, idx) {
        var current = this.head;
        for (var w of word) {
            if (current.children[w] === undefined) {
                current.children[w] = new trieNode(w)
            }
            current.children[w].foundAt.push(idx)
            current = current.children[w]
        }
        current.wordEnd = true;
    }
    revInsert(word, idx) {
        let current = this.head;
        for (let i = word.length - 1; i >= 0; i--) {
            let w = word[i]
            if (current.children[w] === undefined) {
                current.children[w] = new trieNode(w)
            }
            current.children[w].foundAt.push(idx)
            current = current.children[w]
        }
        current.wordEnd = true;
    }

    search(word, prefix = false) {
        var current = this.head;
        for (var w of word) {
            if (current.children[w] === undefined) { return false }
            current = current.children[w]
        }
        return current.foundAt
        // return prefix ? current.foundAt : current.wordEnd;
    }

    startsWith(word) {
        return this.search(word, true)
    }
}



var WordFilter = function (words) {
    this.forwardTrie = new Trie()
    this.backwardTrie = new Trie()
    for (let i = 0; i < words.length; i++) {
        this.forwardTrie.insert(words[i], i);
        this.backwardTrie.revInsert(words[i], i);
    }
    // console.log(JSON.stringify(this.forwardTrie))
};

/** 
 * @param {string} prefix 
 * @param {string} suffix
 * @return {number}
 */
WordFilter.prototype.f = function (prefix, suffix) {
    let preIdxs = this.forwardTrie.search(prefix, true)
    suffix = [...suffix].reverse().join('')
    let sufIdxs = this.backwardTrie.search(suffix, true)
    // console.log(preIdxs, sufIdxs)
    let pre = preIdxs.length - 1, suf = sufIdxs.length - 1;
    while (pre >= 0 && suf >= 0) {
        if (preIdxs[pre] === sufIdxs[suf]) { return preIdxs[pre] }
        preIdxs[pre] > sufIdxs[suf] ? pre-- : suf--
    }
    return -1
};

/** 
 * Your WordFilter object will be instantiated and called as such:
 * var obj = new WordFilter(words)
 * var param_1 = obj.f(prefix,suffix)
 */