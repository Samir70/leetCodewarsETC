var islandPerimeter = function(grid) {
    const dirs =[[-1, 0], [1, 0], [0, -1], [0, 1]];
    var perim = 0;
    for (var row = 0; row<grid.length; row++) {
        for (var col = 0; col<grid[0].length; col++) {
            if (grid[row][col] === 1) {
                var adj = dirs.map(d => [d[0]+row, d[1]+col])
                    .map(x => x[0] === -1 ? 'top' : x)
                    .map(x => x[0] === grid.length ? 'bottom' : x)
                    .map(x => x[1] === -1 ? 'left' : x)
                    .map(x => x[1] === grid[0].length ? 'right' : x)
                    .map(x => typeof x === 'string' ? x : grid[x[0]][x[1]] === 1 ? 'land' : 'sea');
                var edgeCount = adj.reduce((a, v) => v === 'land' ? a : a+1, 0)
                console.log(row, col, adj, edgeCount);
                perim += edgeCount
            }
        }
    }
    return perim
};

const tests = [
    {in:[
        [0,1,0,0],
        [1,1,1,0],
        [0,1,0,0],
        [1,1,0,0]], out:16},
    {in:[[0,0,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]], out:14},
    {in:[[0,0,0,0],[1,1,0,0],[0,1,0,0],[1,1,0,0]], out:12},
    {in:[[1]], out:4},
    {in:[[0]], out:0}
];


// public static int islandPerimeter(int[][] grid) {
//     if (grid == null || grid.length == 0 || grid[0].length == 0) return 0;
//     int result = 0;
//     for (int i = 0; i < grid.length; i++) {
//         for (int j = 0; j < grid[0].length; j++) {
//             if (grid[i][j] == 1) {
//                 result += 4;
//                 if (i > 0 && grid[i-1][j] == 1) result -= 2;
//                 if (j > 0 && grid[i][j-1] == 1) result -= 2;
//             }
//         }
//     }
//     return result;
// }

tests.forEach((t, i) => console.log(
    'test', i, islandPerimeter(t.in)
))