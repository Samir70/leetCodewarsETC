class TrieNode {
    constructor(char) {
        this.val = char;
        this.children = {};
        this.wordEnd = false;
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
        var current = this.head;
        for (w of word) {
            if (current.children[w] === undefined) {
                current.children[w] = new TrieNode(w)
            }
            current = current.children[w]
        }
        current.wordEnd = word
    }

    findChild(c, node = this.head) {
        return node.children[c]
    }
}

const findWords = (board, words) => {
    var foundWords = [];
    var trie = new Trie()
    for (w of words) {
        trie.add(w)
    }
    // console.log(trie)

    const wholePath = (n, r, c) => {
        const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        var tmp = board[r][c];
        board[r][c] = '#'
        var nextSteps = dirs.map(x => [x[0]+r, x[1]+c])
            .filter(x => x[0] >= 0 && x[0]<board.length && x[1] >= 0 && x[1] < board[0].length);
        for (step of nextSteps) {
            var char = board[step[0]][step[1]];
            var n2 = trie.findChild(char, n);
            if (n2 === undefined) {continue}
            if (n2.wordEnd && !n2.wordFound) {
                foundWords.push(n2.wordEnd)
                n2.wordFound = true;
            }
            wholePath(n2, step[0], step[1])
        }
        // console.log(n, nextSteps)
        board[r][c] = tmp
    }

    for (var r = 0; r < board.length; r++) {
        for (var c = 0; c < board[0].length; c++) {
            var n = trie.findChild(board[r][c]);
            if (n === undefined) {continue}
            if (n.wordEnd && !n.wordFound) {
                foundWords.push(n.wordEnd);
                n.wordFound = true
            }
            wholePath(n, r, c)
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