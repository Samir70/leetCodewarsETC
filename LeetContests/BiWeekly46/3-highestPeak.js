// 6676ms !!!!!!

let dirs = [
    [-1, 0], [1, 0], [0, -1], [0, 1]
]
var highestPeak = function (isWater) {
    let height = Array(isWater.length);
    let cells = isWater.length * isWater[0].length;
    for (let i = 0; i < isWater.length; i++) {
        height[i] = Array(isWater[0].length).fill(-1)
    }

    const setAround = (r, c, level) => {
        dirs.forEach(d => {
            let row = r + d[0], col = c + d[1];
            // console.log('trying to set', row, col)
            if (row >= 0 && col >= 0 && row < isWater.length && col < isWater[0].length && height[row][col] === -1) {
                height[row][col] = level;
                cells--
                // console.log('set', row, col, level)
                // console.log(height)
            }
        })
    }
    
    for (let r = 0; r < isWater.length; r++) {
        for (let c = 0; c < isWater[0].length; c++) {
            if (isWater[r][c] === 1) {
                height[r][c] = 0;
                cells--
            }
        }
    }

    let level = 0
    while (cells > 0) {
        for (let r = 0; r < isWater.length; r++) {
            for (let c = 0; c < isWater[0].length; c++) {
                if (height[r][c] === level) {
                    setAround(r, c, level + 1)
                }
            }
        }
        level++
        // console.log(cells, height)
    }
    return height
};

const tests = [
    [[0, 1], [0, 0]],
    [[0, 0, 1], [1, 0, 0], [0, 0, 0]],
    [[0], [0], [0], [0], [1], [0], [0], [1], [1]]
];
const out = [
    [[1, 0], [2, 1]],
    [[1, 1, 0], [0, 1, 1], [1, 2, 2]],
    [[4], [3], [2], [1], [0], [1], [1], [0], [0]]
]

tests.forEach((t, i) => console.log(
    'test', i, highestPeak(t), out[i]
))