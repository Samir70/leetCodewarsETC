class TrieNode {
    constructor(letter) {
        this.val = letter
        this.children = {}
        this.wordend = false
    }
}

class Trie {
    constructor() {
        this.head = { val: null, children: {} }
    }

    add(word) {
        var current = this.head;
        for (var c of word) {
            if (current.children[c] === undefined) {
                current.children[c] = new TrieNode(c)
            }
            current = current.children[c]
        }
        current.wordend = word;
    }

    findNode(c, start = null) {
        var current = start === null ? this.head : start;
        return current.children[c]
    }
}

const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]

const findWords = (board, words) => {
    var wList = new Trie()
    words.forEach(w => wList.add(w));
    // console.log(wList);
    var foundWords = [];

    const wholepath = (journey, node, r, c) => {
        var foundWords = []
        if (node.wordend) { foundWords.push(node.wordend) }
        var nextSteps = dirs.map(d => [d[0] + r, d[1] + c])
            .filter(d => d[0] >= 0 && d[0] < board.length && d[1] >= 0 && d[1] < board[0].length)
            .map(d => { return { letter: board[d[0]][d[1]], rc: d[0] + '-' + d[1] } })
            .map(x => { return { node: wList.findNode(x.letter, node), rc: x.rc } })
            .filter(n => n.node !== undefined && !journey.includes(n.rc))
        // console.log(node, r, c)
        // console.log(journey, nextSteps)
        for (var step of nextSteps) {
            var [row, col] = step.rc.split('-').map(Number)
            var outcome = wholepath([...journey, step.rc], step.node, row, col);
            foundWords = foundWords.concat(outcome)
        }
        return foundWords
    }

    for (var r = 0; r < board.length; r++) {
        for (var c = 0; c < board[0].length; c++) {
            var n = wList.findNode(board[r][c], null);
            if (n) {
                outcome = wholepath([r + '-' + c], n, r, c);
                if (outcome !== false) {
                    foundWords = foundWords.concat(outcome)
                }
            }
            // console.log(board[r][c], 'has node', n)
        }
    }
    return foundWords.filter((x, i) => foundWords.indexOf(x) === i)
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
    'test', i, findWords(t.board, t.words)
));

/**
 * rather than keeping track of journey
 * consider storing board[r][c] in tmp; then set board[r][c] to '#'
 * then reset it at the end.
 * 
 * rather than filtering out the duplicate words
 * consider setting wordend = false for the trienode
 * or use a set
 * 
 */