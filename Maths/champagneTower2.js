/**
 * fill by pouring into top glass.
 * Each glass has two outlets which overflow equally.
 * Glasses in the middle get two contributions from above. 
 * Those on edge only get one.
 * pour one glass worth at a time
 * 1 glass:   [[1]]
 * 2 glasses: [[1], [0.5, 0.5]]
 * 3 glasses: [[1], [1, 1]]
 * 4 glasses: [[1], [1, 1], [0.25, 0.5, 0.25]]
 * 5 glasses: [[1], [1, 1], [0.5, 1, 0.5]]
 * 6 glasses: [[1], [1, 1], [0.75, 1, 0.75], [0, 0.25, 0.25, 0]]
 * 7 glasses: [[1], [1, 1], [1, 1, 1], [0, 0.5, 0.5, 0]]
 * 8 glasses: [[1], [1, 1], [1, 1, 1], [0.125, 0.875, 0.875, 0.125]]
 */

// simulate by keeping track of how much flows through each glass
// eg: 10 in top then 4.5 through each on next rwo
const champagneTower = (poured, row, glass) => {
    // if (row === 0) {return poured > 0 ? 1 : 0}
    let r = 0;
    let flowThru = [poured];
    while (r < row) {
        let nextRowFlow = Array(r+2).fill(0);
        for (let g = 0; g<flowThru.length; g++) {
            let overflow = Math.max((flowThru[g] - 1) / 2, 0);
            nextRowFlow[g] += overflow;
            nextRowFlow[g+1] += overflow;
        }
        flowThru = nextRowFlow;
        // console.log(r, flowThru)
        r++
    }
    return Math.min(flowThru[glass], 1)
}

const tests = [
    { poured: 0, query_row: 0, query_glass: 0, out: 0.00000 },
    { poured: 1, query_row: 0, query_glass: 0, out: 1.00000 },
    { poured: 1, query_row: 1, query_glass: 1, out: 0.00000 },
    { poured: 2, query_row: 1, query_glass: 1, out: 0.50000 },
    { poured: 3, query_row: 1, query_glass: 1, out: 1.00000 },
    { poured: 7, query_row: 3, query_glass: 2, out: 0.5 },
    { poured: 8, query_row: 3, query_glass: 2, out: 0.875 },
    { poured: 18, query_row: 5, query_glass: 3, out: 1 },
    { poured: 18, query_row: 6, query_glass: 2, out: 0.40625 },
    { poured: 100000009, query_row: 33, query_glass: 17, out: 1.00000 }
]

tests.forEach((t, i) => console.log(
    champagneTower(t.poured, t.query_row, t.query_glass) == t.out
))