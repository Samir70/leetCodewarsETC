const noReps = arr => {
    let seen = Array(10).fill(false)
    // console.log('checking', arr)
    for (let a of arr) {
        if (a === '.') {continue}
        if (seen[a]) {return false}
        seen[a] = true
    }
    return true
}
var isValidSudoku = function(board) {
    for (let row of board) {
        if (!noReps(row)) {return false}
    }
    let cols = board.map((r, i) => board.map(row => row[i]))
    // console.log(cols)
    for (let c of cols) {
        if (!noReps(c)) {return false}
    }
    
    let squares = []
    for (let block = 0; block < 3; block++) {
        let a = [], b = [], c = []
        for (let subRow = 0; subRow < 3; subRow++) {
            let r = block*3 + subRow
            a = [...a, ...board[r].slice(0, 3)]
            b = [...b, ...board[r].slice(3, 6)]
            c = [...c, ...board[r].slice(6, 9)]
        }
        squares.push([...a], [...b], [...c])
    }
    // console.log(squares)
    for (let s of squares) {
        if (!noReps(s)) {return false}
    }
    
    return true
};