
// make changes to board, return nothing
const surroundedRegions = board => {
    if (board.length > 2 && board[0].length > 2) {
        // when you find a O, travel as far as you can to neighbouring Os
        // store coordinates
        // if you reach the edge, maintain the oList (to restore at end)
        // otherwise empty the oList
        var stack = [];
        var oToKeep = [];
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        const rows = board.length - 1;
        const cols = board[0].length - 1;
        for (var r = 1; r < rows; r++) {
            for (var c = 1; c < cols; c++) {
                if (board[r][c] === 'O') {
                    var keepOs = false
                    stack.push([r, c]);
                    var oList = [[r, c]];
                    board[r][c] = 'X'
                    while (stack.length > 0) {
                        var [i, j] = stack.pop()
                        directions.forEach(d => {
                            var nr = d[0] + i, nc = d[1] + j;
                            if (board[nr][nc] === 'O') {
                                if (nr === 0 || nr === rows || nc === 0 || nc === cols) {
                                    keepOs = true;
                                    // O was on the edge
                                } else {
                                    stack.push([nr, nc]);
                                    oList.push([nr, nc]);
                                    board[nr][nc] = 'X';
                                }
                            }
                        }); // for each direction
                    }
                    if (keepOs) {
                        oToKeep = oToKeep.concat(oList)
                    }
                }
            }
        }
        oToKeep.forEach(o => {
            var [r, c] = o;
            board[r][c] = 'O'
        })
    }
}

const tests = [
    { in: [["X", "X", "X", "X"], ["X", "O", "O", "X"]] },
    {
        in: [["X", "X", "X", "X"], ["X", "O", "O", "X"], ["X", "X", "O", "X"], ["X", "O", "X", "X"]],
        out: [["X", "X", "X", "X"], ["X", "X", "X", "X"], ["X", "X", "X", "X"], ["X", "O", "X", "X"]]
    },
    {
        in: [["X", "X", "X", "X"], ["X", "X", "O", "X"], ["X", "X", "X", "X"], ["X", "O", "O", "X"], ["X", "O", "X", "X"]],
        out: [["X", "X", "X", "X"], ["X", "X", "X", "X"], ["X", "X", "X", "X"], ["X", "X", "X", "X"], ["X", "O", "X", "X"]]
    }
]

tests.forEach(t => {
    console.log('#######################')
    console.log(t.in);
    surroundedRegions(t.in)
    console.log(t.in)
})