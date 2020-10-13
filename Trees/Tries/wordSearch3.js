// 136 ms, faster than 93.97%
// Prev was 516ms

class TrieNode {
    constructor(letter) {
        this.val = letter;
        this.children = {};
        this.wordEnd = false;
        this.found = false;
    }
}

class Trie {
    constructor() {
        this.head = {
            val: null, 
            children: {}
        }
    }

    add(word) {
        let current = this.head;
        for (let w of word) {
            if (current.children[w] === undefined) {
                current.children[w] = new TrieNode(w)
            }
            current = current.children[w]
        }
        current.wordEnd = word;
    }
}

const findWords = (board, words) => {
    let dictionary = new Trie();
    for (let word of words) {
        dictionary.add(word)
    }

    let foundWords = [];
    const wholePath = (parent, r, c) => {
        if (r < 0 || c < 0 || r >= board.length || c >= board[0].length) {
            return null
        }
        let child = parent.children[board[r][c]];
        if (child === undefined) {return null}
        if (child.wordEnd && !child.found) {
            foundWords.push(child.wordEnd);
            child.found = true
        }
        let tmp = board[r][c];
        board[r][c] = '#';
        wholePath(child, r-1, c);
        wholePath(child, r+1, c);
        wholePath(child, r, c-1);
        wholePath(child, r, c+1);
        board[r][c] = tmp;
        return null;
    }

    for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board[0].length; c++) {
            wholePath(dictionary.head, r, c)
        }
    }
    return foundWords
}

const tests = [
    {
        board: [
            ['o', 'a', 'a', 'n'],
            ['e', 't', 'a', 'e'],
            ['i', 'h', 'k', 'r'],
            ['i', 'f', 'l', 'v']
        ],
        words: ["oath", "pea", "eat", "rain"],
        out: ["eat", "oath"]
    },
    {
        board: [
            ['b', 'a', 'n', 'a'],
            ['e', 'n', 'a', 'e'],
            ['s', 'i', 'c', 'r'],
            ['i', 'f', 'e', 'v']
        ],
        words: ["banana", "bane", "nice", "rise", "vrcrc"],
        out: ["banana", "bane", "nice"]
    },
    {
        board: [
            ['b', 'a', 'n', 'a', 'r', 'h', 'e', 'f', 'o'],
            ['e', 'n', 'a', 'e', 'd', 'w', 'r', 'e', 'r'],
            ['s', 'i', 'c', 'r', 'f', 'h', 'y', 'v', 'e'],
            ['i', 'f', 'e', 'v', 'g', 'e', 'i', 'l', 'm']
        ],
        words: ["banana", "bane", "nice", "rise", "wherefore", "every"],
        out: ["banana", "bane", "nice", "wherefore", "every"]
    },
    {
        board: [["a", "a"]],
        words: ["a"],
        out: ["a"] //ie: not ["a", "a"]
    },
    {
        board: [["a", "b"], ["a", "a"]],
        words: ["aba", "baa", "bab", "aaab", "aaa", "aaaa", "aaba"],
        out: ["aaa", "aaab", "aaba", "aba", "baa"]
    }
];

tests.forEach((t, i) => console.log(
    'test', i, findWords(t.board, t.words), 'should be', t.out
));