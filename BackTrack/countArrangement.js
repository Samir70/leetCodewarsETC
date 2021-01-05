const facMuls = {
    1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    2: [1, 2, 4, 6, 8, 10, 12, 14],
    3: [1, 3, 6, 9, 12, 15],
    4: [1, 2, 4, 8, 12],
    5: [1, 5, 10, 15],
    6: [1, 2, 3, 6, 12],
    7: [1, 7, 14],
    8: [1, 2, 4, 8],
    9: [1, 3, 9],
    10: [1, 2, 5, 10],
    11: [1, 11],
    12: [1, 2, 3, 4, 6, 12],
    13: [1, 13],
    14: [1, 2, 7, 14],
    15: [1, 3, 5, 15]
}


const countArrangement = n => {
    let count = 0;
    const wholePath = (path, used) => {
        if (path.length === n) {
            // console.log('found', path)
            count++;
            return true
        }
        for (let next = n; next > 0; next--) {
            let facMul = path.length + 1;
            if (!used.has(next) && (next % facMul === 0 || facMul % next === 0)) {
                used.add(next);
                wholePath([...path, next], used);
                used.delete(next)
            }
        }
    }
    for (let i = n; i > 0; i--) {
        let used = new Set();
        used.add(i)
        wholePath([i], used);
    }
    return count
}

const tests = [1, 2, 15];
const out = [1, 2, 24679];

tests.forEach((t, i) => console.log(
    'test', i, countArrangement(t), 'should be', out[i]
))