var minTimeToType = function(word) {
    let cur = 'a';
    let count = 0;
    for (let c of word) {
        let pos = cur.charCodeAt(0) - 97
        let nextPos = c.charCodeAt(0) - 97
        let dist = Math.abs(pos - nextPos) % 26
        if (dist > 13) {dist = 26 - dist}
        count += dist + 1
        cur = c
    }
    return count
};

var maxMatrixSum = function(matrix) {
    let max = -Infinity, min = Infinity, negs = 0, sum = 0;
    let n = matrix.length
    for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            let val = matrix[r][c]
            if (val < 0) {
                sum -= val;
                negs++
                if (val > max) {max = val}
            } else {
                sum += val
                if (val < min) {min = val}
            }
        }
    }
    // console.log({sum, negs, max, min})
    if (min < -max) {max = -min}
    return negs % 2 ? sum + max + max : sum
};