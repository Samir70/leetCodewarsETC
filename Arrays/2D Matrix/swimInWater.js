const maxTPath = (grid, visited, r, c, t, maxSoFar) => {
    if (grid[r][c] > t) { return 0 }
    if (r === grid.length - 1 && c === grid[0].length - 1) {
        return maxSoFar
    }
    visited.add([r, c].join(','))
    let next = [[1, 0], [-1, 0], [0, 1], [0, -1]].map(d => [d[0] + r, d[1] + c])
    for (let [y, x] of next) {
        if (y >= 0 && y < grid.length && x >= 0 && x < grid[0].length && !visited.has([y, x].join(','))) {
            let outcome = maxTPath(grid, visited, y, x, t, Math.max(maxSoFar, grid[y][x]))
            if (outcome > 0) { return outcome }
        }
    }
    return 0
}

var swimInWater = function (grid) {
    let left = grid[0][0], right = grid.length ** 2 - 1;
    while (left < right) {
        let visited = new Set();
        visited.add('0,0')
        let mid = Math.floor((left + right) / 2);
        let outcome = maxTPath(grid, visited, 0, 0, mid, grid[0][0])
        // console.log(left, mid, right, '===>', outcome)
        if (outcome === 0) {
            left = mid + 1
        } else {
            right = mid
        }
    }
    return left
};

const bigGrid = [[26,99,80,1,89,86,54,90,47,87],[9,59,61,49,14,55,77,3,83,79],[42,22,15,5,95,38,74,12,92,71],[58,40,64,62,24,85,30,6,96,52],[10,70,57,19,44,27,98,16,25,65],[13,0,76,32,29,45,28,69,53,41],[18,8,21,67,46,36,56,50,51,72],[39,78,48,63,68,91,34,4,11,31],[97,23,60,17,66,37,43,33,84,35],[75,88,82,20,7,73,2,94,93,81]]
const tests = [
    { grid: [[0, 2], [1, 3]], out: 3 },
    { grid: [[0, 1, 2, 3, 4], [24, 23, 22, 21, 5], [12, 13, 14, 15, 16], [11, 17, 18, 19, 20], [10, 9, 8, 7, 6]], out: 16 },
    { grid: bigGrid, out: 81 }
]

tests.forEach((t, i) => console.log(
    'test', i, swimInWater(t.grid) === t.out
))