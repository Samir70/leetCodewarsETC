// given a string and an array of words(dictionary), split the string into words
// in as many ways as possible.
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
}

var wordBreak = function (s, wordDict) {
    if (wordDict.length === 0 || s.length === 0) { return [] }
    var dict = new Trie();
    wordDict.forEach(w => dict.insert(w));
    var out = [];
    var stack = [{ sentence: '', leftover: s }];
    while (stack.length > 0) {
        console.log(stack, out)
        var cur = stack.pop();
        var pointer = dict.head;
        var i = 0;
        while (i < cur.leftover.length) {
            if (pointer.children[cur.leftover[i]]) {
                pointer = pointer.children[cur.leftover[i]];
                cur.sentence += cur.leftover[i]
                if (pointer.wordEnd) {
                    stack.push({ sentence: cur.sentence + ' ', leftover: cur.leftover.slice(i + 1) })
                }
                i++
                if (i === cur.leftover.length && pointer.wordEnd) { out.push(cur.sentence) }
            } else {
                i = Infinity
            }
        }
    }
    return out;
};

const tests = [
    {
        s: "catsanddog", wordDict: ["cat", "cats", "and", "sand", "dog"],
        out: ["cats and dog", "cat sand dog"]
    },
    {
        s: "catsandog", wordDict: ["cats", "dog", "sand", "and", "cat"],
        out: []
    },
    {
        s: "pineapplepenapple", wordDict: ["apple", "pen", "applepen", "pine", "pineapple"],
        out: ["pine apple pen apple", "pineapple pen apple", "pine applepen apple"]

    },
    // got wrong first time
    {
        s: "bb", wordDict: ["a", "b", "bbb", "bbbb"],
        out: ['b b'] // original gave 'bb' as a possible
        // needed to check pointer is at wordend before pushing sentence to out
    },
    // got TLE, note the single b
    {
        s: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        wordDict: ["a", "aa", "aaa", "aaaa", "aaaaa", "aaaaaa", "aaaaaaa", "aaaaaaaa", "aaaaaaaaa", "aaaaaaaaaa"],
        out: []
    }
];

tests.forEach((t, i) => console.log(
    'test', i, wordBreak(t.s, t.wordDict), 'should be ', t.out
))