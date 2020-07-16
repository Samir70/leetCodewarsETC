var Trie = function() {
    this.head = {
        val: null,
        children: {}
    }
}

Trie.prototype.insert = function(word) {
    const trieNode = function(name) {
        this.key = name;
        this.children = {};
        this.wordEnd = false; 
    }
    console.log('adding', word)
    var current = this.head;
    // console.log(this.head.children)
    for (w of word) {
        if (current.children[w] === undefined) {
            current.children[w] = new trieNode(w)
            // console.log(JSON.stringify(current.children))
        } 
        current = current.children[w]
    }
    current.wordEnd = true;
    // console.log(JSON.stringify(this.head))
}

Trie.prototype.search = function(word) {
    var current = this.head;
    for (var w of word) {
        if (current.children[w] === undefined) {return false}
        current = current.children[w];
        // console.log(current.key, current.wordEnd)
    }
    return current.wordEnd 
}

Trie.prototype.startsWith = function(prefix) {
    var current = this.head;
    // follow prefix
    for (var w of prefix) {
        if (current.children[w] === undefined) {return false}
        current = current.children[w]
    }
    return true
}

var test = new Trie();
test.insert('he');
test.insert('hello');
console.log('Does trie contain he?', test.search('he'));
console.log('Does trie contain hell?', test.search('hell'));
console.log('Does trie contain hello?', test.search('hello'));
console.log('Does trie contain word beginning with hell?', test.startsWith('hell'));
console.log('Does trie contain word beginning with help?', test.startsWith('help'));