const { bigDungeon } = require('./bigDungeon')
// fast, but gives wrong answer when rooms around need to be reached by less efficient route

var calculateMinimumHP = function(dungeon) {
    var total = 0;
    var current = [];
    var lowestSoFar = 0
    for (var i = 0; i < dungeon[0].length; i++) {
        total += dungeon[0][i];
        if (total < lowestSoFar) {lowestSoFar = total}
        current.push([lowestSoFar, total])
    }
    var prev = [...current];
    if (dungeon.length === 1) {
        return 1 - current[i-1][0]
    }
    // console.log(prev)
    for (var r = 1; r<dungeon.length; r++) {
        var health = prev[0][1] + dungeon[r][0];
        lowestSoFar = Math.min(health, prev[0][0])
        current = [[lowestSoFar, health]];
        for (var c = 1; c<dungeon[0].length; c++) {
            var health = dungeon[r][c]
            if (current[c-1][0] > prev[c][0]) {
                health += current[c-1][1];
                lowestSoFar = Math.min(current[c-1][0], health)
            } else if (current[c-1][0] < prev[c][0]) {
                health += prev[c][1];
                lowestSoFar = Math.min(prev[c][0], health)
            } else {
                // lowestSoFar is the same from left and above, 
                // Go by max health of entering this room
                health += Math.max(current[c-1][1], prev[c][1]);
                lowestSoFar = Math.min(prev[c][0], health)
            }
            current.push([lowestSoFar, health])
        }
        prev = [...current];
        // console.log('r, prev', r, prev)
    }
    // console.log(r, c, prev[c-1])
    return 1 - prev[c-1][0]
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