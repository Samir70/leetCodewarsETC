const sumEntries = (m, r, c, size) => {
    var sum = 0;
    for (var row = r; row<r+size; row++) {
        for (var col = c; col < c+size; col++ ) {
            sum += m[row][col];
        }
    }
    return sum
}

// this is O(n^6)
const countOneSubs = (m) => {
    const rows = m.length, cols = m[0].length;
    var oneSqs = 0;
    for (var r = 0; r < rows; r++) {
        for (var c = 0; c< cols; c++) {
            for (var s = 1; s+r<=rows && s+c<= cols; s++) {
                if (sumEntries(m, r, c, s) === s*s) {
                    oneSqs++
                    // console.log('found one! total is', oneSqs)
                }
                // console.log('r, c, s', r, c, s, sumEntries(m, r, c, s))
            }
        }
    }
    return oneSqs
}

// with idea from coding world, re: maximal square
const quickCount = m => {
    var rows = m.length, cols = m[0].length + 1;
    for (var r = 0; r<rows; r++) {
        m[r].unshift(0)
    }
    rows++;
    m.unshift(Array(cols).fill(0));
    var sqCount = 0;
    // console.log(m)
    for (r = 1; r<rows; r++) {
        for (c = 1; c < cols; c++) {
            var sq = m[r][c] === 0 ? 0 : Math.min(m[r-1][c-1], m[r-1][c], m[r][c-1]) + m[r][c];
            sqCount += sq;
            // console.log('r, c, sq', r, c, sq)
            m[r][c] = sq
        }
    }
    return sqCount
}


const tests = [
    {
        m : [
            [0,1,1,1],
            [1,1,1,1],
            [0,1,1,1]
          ],
          output: 15
    },

    {
        m: [
            [1,0,1],
            [1,1,0],
            [1,1,0]
          ],
          output: 7
    },
    {
        m : [[0,1,1,1],  [1,1,0,1],  [0,1,1,1]], 
        output: 9
    }
];

tests.forEach((t, i) => console.log('test', i, quickCount(t.m) ))// === t.output))