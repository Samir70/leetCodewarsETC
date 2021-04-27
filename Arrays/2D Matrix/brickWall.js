/**
Draw a vertical line down the brick wall, cutting through least bricks
*/

var leastBricks = function(wall) {
    let endPointTally = {}
    let maxEnds = 0
    let wallLen = wall[0].reduce((a, v) => a + v, 0)
    for (let row of wall) {
        let sum = 0;
        for (let brick of row) {
            sum += brick;
            endPointTally[sum] = (endPointTally[sum] || 0) + 1
            endPointTally[wallLen] = 0
            if (endPointTally[sum] > maxEnds) {maxEnds = endPointTally[sum]}
            // console.log(endPointTally)
        }
    }
    return wall.length - maxEnds
};

const tests = [
  {wall: [[1,2,2,1], [3,1,2], [1,3,2], [2,4], [3,1,2], [1,3,1,1]], out: 2},
  {wall: [[1], [1], [1]], out: 3}
]
