const sameDiag = (a, b) => Math.abs(a[0] - b[0]) === Math.abs(a[1] - b[1]);
const makeBoard = (qs, n) => {
    let board = Array(n);
    for (let r = 0; r < n; r++) {board[r] = Array(n).fill('.')}
    for (let [r, c] of qs) {board[r][c] = 'Q'}
    // console.log('madeBoard', board.map(r => r.join('')))
    return board.map(x => x.join(''))
}

var solveNQueens = function(n) {
    if (n === 1) {return [['Q']]}
    if (n < 4) {return []}
    let colsUsed = new Set();
    let out = []
    const finishBoard = (qSqs, cols, nextRC) => {
        if (nextRC === n) {out.push(makeBoard(qSqs, n)); return}
            for (let c = 0; c < n; c++) {
                // console.log(qSqs, [nextRC, c], qSqs.some(q => sameDiag(q, [nextRC, c])))
                if (cols.has(c) || qSqs.some(q => sameDiag(q, [nextRC, c]))) {continue}
                foundSpot = true
                cols.add(c)
                finishBoard([...qSqs, [nextRC, c]], cols, nextRC+1)
                cols.delete(c)
            }
    }

    for (let c = 0; c < n; c++) {
        colsUsed.add(c)
        finishBoard([[0, c]], colsUsed, 1)
        colsUsed.delete(c)
    }
    return out
};