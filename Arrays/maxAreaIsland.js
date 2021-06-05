// beat 5%
const area = (grid, row, col) => {
    let stack = [[row, col]]; 
    let count = 0;
    while (stack.length > 0) {
        let [r, c] = stack.pop()
        if (grid[r][c] === 1) {count++}
        grid[r][c] = '#'; 
        let uplr = [[-1, 0], [1, 0], [0, -1], [0, 1]].map(sq => [sq[0]+r, sq[1]+c])
                    .filter(sq => sq[0] >= 0 && sq[0] < grid.length && sq[1] >= 0 && sq[1] < grid[0].length)
        uplr.forEach(sq => {
            if (grid[sq[0]][sq[1]] === 1) {stack.push(sq)}
        })
    }
    return count
}
var maxAreaOfIsland = function(grid) {
    let maxArea = 0;
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if (grid[r][c] === 1) {
                maxArea = Math.max(maxArea, area(grid, r, c))
            }
        }
    }
    return maxArea
};

// Beat 11%
const area = (grid, row, col) => {
    let stack = [[row, col]]; 
    let count = 0;
    while (stack.length > 0) {
        let [r, c] = stack.pop()
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] !== 1) {continue}
        count++
        grid[r][c] = '#'; 
        stack.push([r-1, c], [r+1, c], [r, c-1], [r, c+1])
    }
    return count
}
var maxAreaOfIsland = function(grid) {
    let maxArea = 0;
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if (grid[r][c] === 1) {
                maxArea = Math.max(maxArea, area(grid, r, c))
            }
        }
    }
    return maxArea
};

// beats 15.% 
var maxAreaOfIsland = function(grid) {
    const area = (row, col) => {
        let stack = [[row, col]]; 
        let count = 0;
        while (stack.length > 0) {
            let [r, c] = stack.pop()
            if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] !== 1) {continue}
            count++
            grid[r][c] = '#'; 
            stack.push([r-1, c], [r+1, c], [r, c-1], [r, c+1])
        }
        return count
    }
    let maxArea = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 1) {
                maxArea = Math.max(maxArea, area(i, j))
            }
        }
    }
    return maxArea
};
