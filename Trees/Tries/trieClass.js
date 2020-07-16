class trieNode {
    constructor(name) {
        this.key = name;
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

    insert(word) {
        var current = this.head;
        for (var w of word) {
            if (current.children[w] === undefined) {
                current.children[w] = new trieNode(w)
            }
            current = current.children[w]
        }
        current.wordEnd = true;
    }

    search(word, prefix = false) {
        var current = this.head;
        for (var w of word) {
            if (current.children[w] === undefined) { return false}
            current = current.children[w]
        }
        return prefix ? true : current.wordEnd;
    }

    startsWith(word) {
        return this.search(word, true)
    }
}

var test = new Trie();
test.insert('he');
test.insert('hello');
// console.log(JSON.stringify(test, null, 2))
console.log('Does trie contain he?', test.search('he'));
console.log('Does trie contain hell?', test.search('hell'));
console.log('Does trie contain hello?', test.search('hello'));
console.log('Does trie contain word beginning with hell?', test.startsWith('hell'));
console.log('Does trie contain word beginning with help?', test.startsWith('help'));