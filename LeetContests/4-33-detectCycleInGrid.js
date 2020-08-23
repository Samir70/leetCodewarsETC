// given a grid full of lowercase letter, detect if there is a cycle

// passed 70/74 inputs
var containsCycle = function (grid) {

    const wholePath = (r, c, letter, last = [-1, -1]) => {
        // console.log(r, c, letter);
        // if (grid[r][c] === '#') {
        //     console.log('loop closed at', r, c); 
        //     return true
        // };
        const dirs = [[0, -1], [0, 1], [-1, 0], [1, 0]];
        var tmp = grid[r][c];
        grid[r][c] = '#';
        // console.log(grid)
        var nextSteps = dirs.map(x => [x[0] + r, x[1] + c])
            .filter(x => x[0] >= 0 && x[0] < grid.length && x[1] >= 0 && x[1] < grid[0].length);
        // console.log(nextSteps, 'last', last)
        for (let step of nextSteps) {
            if (step[0] === last[0] && last[1] === step[1]) { continue }
            if (grid[step[0]][step[1]] === '#') { return true }
            if (grid[step[0]][step[1]] === letter) {
                let outcome = wholePath(step[0], step[1], letter, [r, c])
                if (outcome) { return true }
            }
        }
        grid[r][c] = tmp
        return false
    }

    for (var r = 0; r < grid.length; r++) {
        for (var c = 0; c < grid[0].length; c++) {
            let letter = grid[r][c];
            grid[r][c] = '#';
            var outcome = wholePath(r, c, letter);
            grid[r][c] = letter;
            if (outcome) { return true }
        }
    }
    return false
};

const tests = [
    { in: [["a", "a", "a", "a"], ["a", "b", "b", "a"], ["a", "b", "b", "a"], ["a", "a", "a", "a"]], out: true },
    { in: [["c", "c", "c", "a"], ["c", "d", "c", "c"], ["c", "c", "e", "c"], ["f", "c", "c", "c"]], out: true },
    { in: [["a", "b", "b"], ["b", "z", "b"], ["b", "b", "a"]], out: false }
];

tests.forEach((t, i) => console.log(
    'test', i, containsCycle(t.in), 'should be', t.out
))