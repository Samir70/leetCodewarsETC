// failed because water can flow right as well as left
const pacificAtlantic = arr => {
    let rows = arr.length, cols = arr[0].length;
    const canReachP = [...Array(rows)].map(_ => Array(cols).fill(false))
    const canReachA = [...Array(rows)].map(_ => Array(cols).fill(false))
    // console.log(canReachP)
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (
                r === 0 || c === 0  // already on coast
                || (canReachP[r - 1][c] && arr[r - 1][c] <= arr[r][c]) // can flow up all the way
                || (canReachP[r][c - 1] && arr[r][c - 1] <= arr[r][c]) // can flow left all the way
            ) {
                canReachP[r][c] = true
            }
        }
        // console.log(canReachP)
    }
    for (let r = rows - 1; r >= 0; r--) {
        for (let c = cols - 1; c >= 0; c--) {
            if (
                r === rows - 1 || c === cols - 1  // already on coast
                || (canReachA[r + 1][c] && arr[r + 1][c] <= arr[r][c]) // can flow down all the way
                || (canReachA[r][c + 1] && arr[r][c + 1] <= arr[r][c]) // can flow right all the way
            ) {
                canReachA[r][c] = true
            }
        }
        // console.log(canReachA)
    }
    console.log(canReachP, canReachA)
    let out = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (canReachA[r][c] && canReachP[r][c]) { out.push([r, c]) }
        }
    }
    return out
}

const tests = [
    // {
    //     arr: [[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]],
    //     out: [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]]
    // },
    {
        arr: [[1, 2, 3], [8, 9, 4], [7, 6, 5]],
        out: [[0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]]
    }
];

tests.forEach((t, i) => console.log(
    'test', i, pacificAtlantic(t.arr)
))

