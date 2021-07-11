const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]]
var nearestExit = function(maze, entrance) {
    let rows = maze.length, cols = maze[0].length;
    let added = new Set();
    let stack = [{point:entrance, dist:0}]
    added.add(entrance.join(','))
    let newStack = []
    while (stack.length || newStack.length) {
        console.log(stack)//.length, 'points to consider')
        // console.table(maze)
        while (stack.length) {
            let cur = stack.pop();
            let [r, c] = cur.point;
            maze[r][c] = cur.dist
            if (r === 0 || r === rows - 1 || c === 0 || c === cols - 1) {
                if (cur.dist > 0) { return cur.dist }
            }
            for (let d of dirs) {
                let nr = r + d[0], nc = c+d[1];
                let key = [nr, nc].join(',');
                if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || added.has(key) || maze[nr][nc] !== '.') {continue}
                newStack.push({point:[nr, nc], dist: cur.dist+1})
                added.add(key)
            }
        }
        stack = [...newStack]
        newStack = []
    }
    console.table(maze)
    return -1
};

// console.log(nearestExit([["+",".","+","+","+","+","+"],["+",".",".",".",".",".","+"],["+",".",".",".",".",".","+"],["+",".",".",".",".",".","+"],["+","+","+","+","+",".","+"]], [0,1]))
// console.log(nearestExit([["+",".","+","+","+","+","+"],["+",".","+",".",".",".","+"],["+",".","+",".","+",".","+"],["+",".",".",".","+",".","+"],["+","+","+","+","+",".","+"]], [0,1]))
    // ["+","E","+","+","+","+","+"],
    // ["+",".","+",".",".",".","+"],
    // ["+",".","+",".","+",".","+"],
    // ["+",".",".",".","+",".","+"],
    // ["+","+","+","+","+",".","+"]]

// console.log(nearestExit([["+",".","+",".","+","+","+"],["+",".","+",".",".",".","+"],["+",".","+",".","+",".","+"],["+",".",".",".",".",".","+"],["+","+","+","+",".","+","."]], [0,1]))
    // ["+","E","+",".","+","+","+"],
    // ["+",".","+",".",".",".","+"],
    // ["+",".","+",".","+",".","+"],
    // ["+",".",".",".",".",".","+"],
    // ["+","+","+","+",".","+","."]]

let {bigMaze, bigEnt} = require('./2-bigtest')
console.log(nearestExit(bigMaze, bigEnt))