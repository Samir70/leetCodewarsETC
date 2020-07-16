const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]
const legit = (r, c, rows, cols) => r >= 0 && c >= 0 && r <= rows && c <= cols


const findWords = (board, words) => {
    const wholepath = (journey, found, lookingFor, r, c) => {
        // console.log(journey, found, lookingFor)
        if (found === lookingFor) { return journey }
        var nextSteps = dirs.filter(d =>
            legit(r + d[0], c + d[1], board.length - 1, board[0].length - 1)
        );
        for (var n of nextSteps) {
            var row = r+n[0], col = c+n[1];
            if (journey.includes(row+'-'+col)) {continue}
            if (board[row][col] === lookingFor[found.length]) {
                var outcome = wholepath([...journey, row+'-'+col], found+lookingFor[found.length], lookingFor, row, col)
                if (outcome !== false) {return outcome}
            }
        }
        return false
    }
    var foundWords = [];
    for (word of words) {
        var outcome = false;
        for (var r = 0; r < board.length; r++) {
            for (c = 0; c < board[0].length; c++) {
                // console.log('letter', board[r][c]);
                if (word[0] === board[r][c]) {
                    outcome = wholepath([r + '-' + c], word[0], word, r, c)
                }
                if (outcome !== false) { 
                    foundWords.push({ word, path: outcome }) 
                    r = Infinity; c = Infinity;
                }
            }
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
    }
];

tests.forEach((t, i) => console.log(
    'test', i, findWords(t.board, t.words)
))