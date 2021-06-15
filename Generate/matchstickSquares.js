// greedy version, wrong answer
var makesquare1 = function (sticks) {
    if (sticks.length < 4) { return false }
    let perim = sticks.reduce((acc, val) => acc + val, 0);
    let side = Math.floor(perim / 4);
    if (side * 4 !== perim) { return false }
    sticks.sort((a, b) => a - b);
    let right = sticks.length - 1;
    if (sticks[right] > side) { return false }
    let sides = [0, 0, 0, 0];
    while (right >= 0) {
        let cur = sticks[right];
        console.log('fitting', cur)
        for (let s = 0; s < 4; s++) {
            if (sides[s] + cur <= side) {
                sides[s] += cur;
                break
            }
            if (s === 3) { return false }
        }
        console.log(sides, 'target', side)
        right--
    }
    return sides.every(s => s === side)
};


var makesquare = function (sticks) {
    if (sticks.length < 4) { return false }
    let perim = sticks.reduce((acc, val) => acc + val, 0);
    let side = Math.floor(perim / 4);
    if (side * 4 !== perim) { return false } // use perim % 4 !== 0, it's clearer
    sticks.sort((a, b) => a - b);
    let right = sticks.length - 1;
    if (sticks[right] > side) { return false }
    let options = [[0, 0, 0, 0]];
    while (right >= 0) {
        let cur = sticks[right];
        // console.log('fitting', cur, 'target', side)
        let newOptions = [], newOptsAlready = new Set();
        while (options.length) {
            let addedTo = new Set();
            let old = options.pop();
            let next = [...old]
            for (let s = 0; s < 4; s++) {
                // console.log('considering', old, 'addedTo', addedTo)
                if (addedTo.has(old[s])) {continue}
                if (old[s] + cur <= side) {
                    next[s] += cur;
                    addedTo.add(old[s]);
                    if (!newOptsAlready.has(next.join(','))) {
                        newOptions.push(next);
                        newOptsAlready.add(next.join(','))
                    }
                    next = [...old]
                }
            }
        }
        if (newOptions.length === 0) {return false}
        options = [...newOptions]
        // console.log(options)
        right--
    }
    return options[0].every(s => s === side)
};

const tests = [
    { sticks: [1, 1, 2, 2, 2], out: true },
    { sticks: [3, 3, 3, 3, 4], out: false },
    { sticks: [13, 1, 1, 1], out: false },
    { sticks: [1, 3, 3, 3, 3, 3], out: false },
    { sticks: [1, 1, 1, 2, 2, 2, 3, 3, 5], out: true },
    { sticks: [5, 5, 5, 5, 4, 4, 4, 4, 3, 3, 3, 3], out: true } // breaks 1
];

tests.forEach((t, i) => console.log(
    'test', i, makesquare(t.sticks) === t.out
))