// 72ms; beats 93%
const uniquePathsIII = grid => {
    let paths = 0;
    let start = [], zeros = 0;
    let rows = grid.length, cols = grid[0].length;
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if (grid[r][c] === 1) { start = [r, c] }
            if (grid[r][c] === 0) { zeros++ }
        }
    }
    const wholePath = (r, c) => {
        if (r < 0 || c < 0 || r === rows || c === cols || grid[r][c] < 0) {return}
        let cell = grid[r][c]
        if (cell === 2 && zeros === 0) {
            paths++; 
            return
        }
        grid[r][c] = -1;
        zeros--;
        wholePath(r-1, c);
        wholePath(r+1, c);
        wholePath(r, c-1);
        wholePath(r, c+1);
        grid[r][c] = cell;
        zeros++;
    }
    // start searching NSEW of the start
    grid[start[0]][start[1]] = -1
    wholePath(start[0]-1, start[1]);
    wholePath(start[0]+1, start[1]);
    wholePath(start[0], start[1]-1);
    wholePath(start[0], start[1]+1);
    grid[start[0]][start[1]] = 1
    return paths
}

const tests = [
    { in: [[1, 0, 0, 0], [0, 0, 0, 0], [0, 0, 2, -1]], out: 2 },
    { in: [[1, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 2]], out: 4 },
    { in: [[-1, -1, 0, 0], [-1, -1, 0, 0], [1, 0, 0, 2]], out: 1 },
    { in: [[0, 1], [2, 0]], out: 0 }
];

tests.forEach((t, i) => console.log(
    'test', i, uniquePathsIII(t.in) === t.out
))