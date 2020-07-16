const { bigDungeon } = require('./bigDungeon')
// fast, but gives wrong answer when rooms around need to be reached by less efficient route

var calculateMinimumHP = function (dungeon) {
    // store the healthNeeded to enter at (row, col) safely and then be able to continue
    var row = dungeon.length;
    while (row > 0) {
        row--
        var col = dungeon[0].length;
        col--
        if (row === dungeon.length - 1) {
            dungeon[row][col] = Math.max(1, 1 - dungeon[row][col]);
        } else {
            var neededToGoDown = Math.max(
                1, 1 - dungeon[row][col], dungeon[row + 1][col] - dungeon[row][col]
            )
            dungeon[row][col] = neededToGoDown;
        }
        while (col > 0) {
            col--
            var neededToGoRight = Math.max(
                1, 1 - dungeon[row][col], dungeon[row][col + 1] - dungeon[row][col]
            );
            var neededToGoDown = Infinity;
            if (row < dungeon.length - 1) {
                neededToGoDown = Math.max(
                    1, 1 - dungeon[row][col], dungeon[row+1][col] - dungeon[row][col]
                )
            }
            dungeon[row][col] = Math.min(neededToGoDown, neededToGoRight)
        }
    }
    // console.log(dungeon)
    return dungeon[0][0]
};

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
    'tests', i, '::', calculateMinimumHP(t.dungeon), 'should be:', t.out
))