const dirs = [
    [-1, 0], [-1, 1], [0, 1], [1, 1],
    [1, 0], [1, -1], [0, -1], [-1, -1]
]
var checkMove = function(board, rMove, cMove, color) {
    const offBoard = (r, c) => board[r] === undefined || board[r][c] === undefined
    const checkdir = (r, c, d, midCol, endCol) => {
        r += d[0]; c += d[1];
        if (offBoard(r, c)) {return false} 
        let foundMid = false
        while (board[r][c] === midCol) {
            foundMid = true;
            r += d[0]; c += d[1];
            if (offBoard(r, c)) {return false} 
            // console.log([r, c], 'is', board[r][c])
        }
        // console.log('dir',d, 'end of line at ', r, c, 'is', board[r][c])
        return foundMid && board[r][c] === endCol
    }
    for (let d of dirs) {
        let otherCol = color === 'B' ? 'W' : 'B'
        let outcome = checkdir(rMove, cMove, d, otherCol, color)
        if (outcome) {return true}
    }
    return false
};