const pacificAtlantic = arr => {
    let rows = arr.length, cols = arr[0].length;
    const canReachP = [...Array(rows)].map(_ => Array(cols).fill(false))
    const canReachA = [...Array(rows)].map(_ => Array(cols).fill(false))
    // console.log(canReachP)
    let stack = [];
    for (let r = 0; r < rows; r++) {
        canReachP[r][0] = true;
        canReachA[r][cols - 1] = true
        stack.push(['p', r, 0]);
        stack.push(['a', r, cols - 1])
    }
    for (let c = 0; c < cols; c++) {
        canReachP[0][c] = true;
        canReachA[rows - 1][c] = true
        stack.push(['p', 0, c]);
        stack.push(['a', rows - 1, c])
    }
    const dealWith = (oc, r, c) => {
        if (oc === 'p') {
            canReachP[r][c] = true;
        } else {
            canReachA[r][c] = true;
        }
        stack.push([oc, r, c])
        // console.log('dealtwith', stack)
    }
    while (stack.length) {
        // console.log(stack.pop())
        let cur = stack.pop()
        let ocean = cur[0], r = cur[1], c = cur[2];
        if (ocean === 'p') {
            if (r+1 < rows && arr[r+1][c] >= arr[r][c] && !canReachP[r+1][c]) {dealWith(ocean, r+1, c)}
            if (c+1 < cols && arr[r][c+1] >= arr[r][c] && !canReachP[r][c+1]) {dealWith(ocean, r, c+1)}
            if (r-1 > -1 && arr[r-1][c] >= arr[r][c] && !canReachP[r-1][c]) {dealWith(ocean, r-1, c)}
            if (c-1 > -1 && arr[r][c-1] >= arr[r][c] && !canReachP[r][c-1]) {dealWith(ocean, r, c-1)}
        } else {
            if (r+1 < rows && arr[r+1][c] >= arr[r][c] && !canReachA[r+1][c]) {dealWith(ocean, r+1, c)}
            if (c+1 < cols && arr[r][c+1] >= arr[r][c] && !canReachA[r][c+1]) {dealWith(ocean, r, c+1)}
            if (r-1 > -1 && arr[r-1][c] >= arr[r][c] && !canReachA[r-1][c]) {dealWith(ocean, r-1, c)}
            if (c-1 > -1 && arr[r][c-1] >= arr[r][c] && !canReachA[r][c-1]) {dealWith(ocean, r, c-1)}
        }        
    }

    // console.log(canReachP, canReachA)
    let out = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (canReachA[r][c] && canReachP[r][c]) { out.push([r, c]) }
        }
    }
    return out
}

const tests = [
    {
        arr: [[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]],
        out: [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]]
    },
    {
        arr: [[1, 2, 3], [8, 9, 4], [7, 6, 5]],
        out: [[0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]]
    }
];

tests.forEach((t, i) => console.log(
    'test', i, pacificAtlantic(t.arr)
))

