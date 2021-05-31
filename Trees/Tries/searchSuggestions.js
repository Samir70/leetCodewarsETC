class TrieNode {
    constructor(name) {
        this.key = name;
        this.children = {};
        this.words = [];
        this.wordEnd = false;
    }
}

class Trie {
    constructor() {
        this.head = {
            val: null,
            children: {},
            words: []
        }
    }

    insert(word) {
        var current = this.head;
        for (var w of word) {
            if (current.children[w] === undefined) {
                current.children[w] = new TrieNode(w)
            }
            current.children[w].words.push(word)
            current = current.children[w]
        }
        current.wordEnd = true;
    }

    search(word, prefix = false) {
        var current = this.head;
        for (var w of word) {
            if (current.children[w] === undefined) { return []}
            current = current.children[w]
        }
        return prefix ? current.words.slice(0, 3) : current.wordEnd;
    }

    startsWith(word) {
        return this.search(word, true)
    }
}
var suggestedProducts = function(products, searchWord) {
    products.sort();
    let prods = new Trie();
    for (let p of products) {
        prods.insert(p)
    }
    let out = [], prefix = ''
    for (let sw of searchWord) {
        prefix += sw
        out.push(prods.startsWith(prefix))
    }
    return out
};

/**
 * Faster was:
 * var suggestedProducts = function(products, searchWord) {
    let output = []
    for (let i = 0; i < searchWord.length; i++) {
        let arr = [];

        for(let j = 0; j < products.length; j++) {
            if (products[j][i] === searchWord[i]) {
                arr.push(products[j])
            }
        }
        
        if (i === 0) {
            arr.sort();
        }
        
        products = arr;
        output.push(arr.slice(0,3));
    }
    
    return output;
};

 */

const tests = [
    { products: ["mobile", "mouse", "moneypot", "monitor", "mousepad"], searchWord: "mouse" },
    { products: ["silly"], searchWord: "fool" },
    {
        products: ["mobile", "mouse", "moneypot", "monitor", "mousepad", "men", "mock"], 
        searchWord: "mouses"
    }
]