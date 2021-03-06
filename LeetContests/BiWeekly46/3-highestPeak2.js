// 872ms
let dirs = [0, 1, 0, -1, 0]
var highestPeak = function (isWater) {
    let rows = isWater.length, cols = isWater[0].length;
    let height = isWater.map(row => row.map(c => c - 1));
    let q = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (height[r][c] === 0) { q.push([r, c]) }
        }
    }
    let pointer = 0;
    while (pointer < q.length) {
        let [r, c] = q[pointer];
        // console.log(pointer, r, c)
        for (let d = 0; d < 4; d++) {
            let nr = r + dirs[d], nc = c + dirs[d + 1];
            // console.log('..', nr, nc)
            if (nr < 0 || nc < 0 || nr === rows || nc === cols || height[nr][nc] !== -1) { continue }
            // console.log('setting', nr, nc)
            q.push([nr, nc]);
            height[nr][nc] = height[r][c] + 1;
            // console.log(q)
        }
        pointer++
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