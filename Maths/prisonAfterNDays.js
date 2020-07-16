/**
 * 8 cells
 * If a cell has two adjacent neighbors that are both occupied or both vacant, 
 * then the cell becomes occupied.
 * -- Otherwise, it becomes vacant
 */

const oneDay = (cells) => {
    var prev = [...cells], next = [...cells];
    next[0] = 0; next[7] = 0
    for (var i = 1; i < 7; i++) {
        if (prev[i - 1] === prev[i + 1]) {
            next[i] = 1
        } else {
            next[i] = 0
        }
    }
    return next
}

var prisonAfterNDays = function (cells, N) {
    var vals = [parseInt(cells.join(''), 2)];
    var tort = -1, rabbit = 0;
    var prev = [...cells];
    var i = 0;
    while (i<N) {
        var next = oneDay(prev);
        prev = [...next];
        var val = parseInt(next.join(''), 2);
        vals.push(val)
        i++
        if (i%2===0) {
            tort++; rabbit +=2
        }
        if (vals[tort] === vals[rabbit]) {
            // console.log('vals ', tort, rabbit, 'are both', vals[tort]);
            var leap = rabbit - tort;
            var mult = Math.floor((N - i)/leap);
            i += mult*leap;
        }
        // console.log(i, next, val)
    }
    return next
};

const tests = [
    { cells: [0, 1, 0, 1, 1, 0, 0, 1], N: 7, out: [0, 0, 1, 1, 0, 0, 0, 0] },
    // Day 0: [0, 1, 0, 1, 1, 0, 0, 1]
    // Day 1: [0, 1, 1, 0, 0, 0, 0, 0]
    // Day 2: [0, 0, 0, 0, 1, 1, 1, 0]
    // Day 3: [0, 1, 1, 0, 0, 1, 0, 0]
    // Day 4: [0, 0, 0, 0, 0, 1, 0, 0]
    // Day 5: [0, 1, 1, 1, 0, 1, 0, 0]
    // Day 6: [0, 0, 1, 0, 1, 1, 0, 0]
    // Day 7: [0, 0, 1, 1, 0, 0, 0, 0]
    { cells: [0, 1, 0, 1, 1, 0, 0, 1], N: 70, out: [ 0, 0, 0, 0, 1, 1, 0, 0 ] },
    
    { cells: [1, 0, 0, 1, 0, 0, 1, 0], N: 1000000000, out: [0, 0, 1, 1, 1, 1, 1, 0] }
];

tests.forEach((t, i) => console.log(
    'test', i, prisonAfterNDays(t.cells, t.N), 'should be ', t.out
))