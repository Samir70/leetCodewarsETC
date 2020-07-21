// destroys board, needs a better version.

var exist = function (board, word) {
    const wholepath = (r, c, i) => {
        if (i === word.length) { return true }
        const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        var tmp = board[r][c];
        board[r][c] = '#';
        var nextSteps = dirs.map(x => [x[0]+r, x[1]+c])
            .filter(x => x[0] >= 0 && x[0]<board.length && x[1] >= 0 && x[1] < board[0].length);
        for (step of nextSteps) {
            if (word[i] === board[step[0]][step[1]]) {
                if (wholepath(step[0], step[1], i+1)) {return true}
            }
        }
        board[r][c] = tmp;
        return false
    }


    for (var r = 0; r < board.length; r++) {
        for (var c = 0; c < board[0].length; c++) {
            if (board[r][c] === word[0]) {
                // start saerch if first letter of word
                if (wholepath(r, c, 1)) { return true }
            }
        }
    }
    return false
};

/**
 * The map and filter seems to be what is slowing things down.
 * try a condition like 
 * if (i < 0 || j < 0 || i >= board.length || j >= board[i].length || board[i][j] !== word.charAt(index)) {
        return false
    }
 */

var tests = [
    {
        board: [
            ['A', 'B', 'C', 'E'],
            ['S', 'F', 'C', 'S'],
            ['A', 'D', 'E', 'E']
        ], word: 'ABCCED', out: true
    },
    {
        board: [
            ['A', 'B', 'C', 'E'],
            ['S', 'F', 'C', 'S'],
            ['A', 'D', 'E', 'E']
        ], word: 'ABCD', out: false
    },
    {
        board: [
            ['b', 'a', 'n', 'a', 'r', 'h', 'e', 'f', 'o'],
            ['e', 'n', 'a', 'e', 'd', 'w', 'r', 'e', 'r'],
            ['s', 'i', 'c', 'r', 'f', 'h', 'y', 'v', 'e'],
            ['i', 'f', 'e', 'v', 'g', 'e', 'i', 'l', 'm']
        ],
        word: 'wherefore',
        out: true
    },
    {
        board: [
            ['A', 'B', 'C', 'E'],
            ['S', 'F', 'C', 'S'],
            ['A', 'D', 'E', 'E']
        ], word: 'SEE', out: true
    }
];

tests.forEach((t, i) => console.log(
    'test', i, exist(t.board, t.word) === t.out, t.board
))