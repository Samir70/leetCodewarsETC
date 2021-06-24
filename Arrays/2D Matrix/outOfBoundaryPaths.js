// 156ms beats only 15%; mem beats 51%
var findPaths = function(rows, cols, maxMove, startRow, startColumn) {
    let getOut = [startRow + 1, startColumn + 1, rows - startRow, cols - startColumn]
    let minMoves = Math.min(...getOut);
    if (minMoves > maxMove) {return 0}
    if (minMoves === maxMove) {return getOut.filter(x => x === maxMove).length}
    let waysToRC = Array(rows)
    for (let r = 0; r < rows; r++) {waysToRC[r] = Array(cols).fill(0)}
    waysToRC[startRow][startColumn] = 1;
    let out = getOut.filter(x => x === 1).length, base = 10**9 + 7;
    for (let move = 1; move < maxMove; move++) {
        let newMovesTo = [];
        for (let r = 0; r < rows; r++) {
            let newRow = [];
            for (let c = 0; c < cols; c++) {
                let adj = [[1, 0], [-1, 0], [0, 1], [0, -1]].map(d => [d[0]+r, d[1]+c]);
                let total = 0;
                for (let i = 0; i < 4; i++) {
                    let [a, b] = adj[i]
                    if (a < 0 || a >= rows || b < 0 || b >= cols) {continue}
                    total = (total + waysToRC[a][b]) % base
                }
                newRow.push(total)
            }
            newMovesTo.push(newRow)
        }
        // console.log(newMovesTo)
        // add up ways to get out
        for (let c = 0; c < cols; c++) {
            out = (out + newMovesTo[0][c]) % base;
            out = (out + newMovesTo[rows - 1][c]) % base;
        }
        for (let r = 0; r < rows; r++) {
            out = (out + newMovesTo[r][0]) % base;
            out = (out + newMovesTo[r][cols - 1]) % base
        }
        waysToRC = [...newMovesTo]
    }
    return out
};

const tests = [
  {params: [3, 4, 2, 1, 1], out: 3},
  {params: [3, 4, 3, 1, 1], out: 16},
  {params: [3, 4, 4, 1, 1], out: 52},
  {params: [3, 4, 50, 1, 1], out: 752971363}
];
