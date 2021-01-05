const countAlive = (arr, r, c) => {
    let rows = arr.length, cols = arr[0].length;
    let dirs = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1],
    ];
    let seats = dirs.map(d => [d[0] + r, d[1] + c])
        .filter(s => s[0] < rows && s[0] >= 0 && s[1] < cols && s[1] >= 0)
        .map(s => arr[s[0]][s[1]]);
    return seats.reduce((a, c) => c & 1 ? a + 1 : a, 0)
}

const gameOfLife = board => {
    let rows = board.length, cols = board[0].length;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let state = board[r][c];
            let neighbours = countAlive(board, r, c)
            console.log(r, c, 'neighbours', neighbours)
            let nextState
            if (state) {
                nextState = neighbours < 2 ? 0 :
                    neighbours < 4 ? 2 : 0
            } else {
                nextState = neighbours === 3 ? 2 : 0
            }
            board[r][c] = state + nextState
        }
    }
    return board.map(r => r.map(c => c >> 1 ? 1 : 0))
}

const tests = [
    { board: [[0, 1, 0], [0, 0, 1], [1, 1, 1], [0, 0, 0]], out: [[0, 0, 0], [1, 0, 1], [0, 1, 1], [0, 1, 0]] },
    { board: [[1, 1], [1, 0]], out: [[1, 1], [1, 1]] }
]

tests.forEach((t, i) => console.log(
    'test', i, gameOfLife(t.board), 'should be', t.out
))