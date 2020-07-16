const { bigDungeon } = require('./bigDungeon')

// TLE, can't even confirm right answer for bigDungeon
const minHP = dungeon => {
    if (dungeon.length === 1) {
        var allRight = dungeon[0].reduce((a, b) => a[1] + b < a[0] ? [a[1] + b, a[1] + b] : [a[0], a[1] + b], [0, 0])[0];
        return allRight > 0 ? 1 : 1 - allRight
    }
    var bestHealth = -Infinity;
    var stack = [{ route: '', location: [0, 0], health: dungeon[0][0], lowestHP: dungeon[0][0] }];
    while (stack.length > 0) {
        var current = stack.pop();
        var [r, c] = current.location;
        if (r === dungeon.length - 1 && c === dungeon[0].length - 1) {
            bestHealth = Math.max(bestHealth, current.lowestHP)
            console.log(current)
        }
        if (r + 1 < dungeon.length) {
            var newHealth = current.health + dungeon[r + 1][c];
            stack.push({
                route: current.route + 'D', location: [r + 1, c],
                health: newHealth, lowestHP: Math.min(newHealth, current.lowestHP)
            })
        }
        if (c + 1 < dungeon[0].length) {
            var newH = current.health + dungeon[r][c + 1];
            stack.push({
                route: current.route + 'R', location: [r, c + 1],
                health: newH, lowestHP: Math.min(newH, current.lowestHP)
            })
        }
    }
    return bestHealth > 0 ? 1 : 1 - bestHealth
}

const tests = [
    { dungeon: [[-2, -3, 3], [-5, -10, 1], [10, 30, -5]], out: 7 },
    { dungeon: [[-2, -3, 3], [-3, -10, 1], [10, 30, -5]], out: 6 },
    { dungeon: [[-2, -3, 3, -3], [-5, -10, 1, 4], [10, 30, -5, -2]], out: 6 },
    { dungeon: [[1, -3, 3], [0, -2, 0], [-3, -3, -3]], out: 3 },
    { dungeon: [[1, -3, 3]], out: 3 },
    { dungeon: [[1, 3, 3]], out: 1 },
    { dungeon: bigDungeon, out:85},
    { dungeon: [[2], [1]], out: 1 }
];

tests.forEach((t, i) => console.log(
    'tests', i, '::', minHP(t.dungeon), 'should be:', t.out
))