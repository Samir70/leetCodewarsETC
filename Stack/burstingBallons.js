/**
 * How many arrows needed to burst balloons?
 * Arrows are fired str8 up
 * input is start and end co-ordinates of each ballon
 */

// obv first attempt: merge intervals
var findMinArrowShots = function(points) {
    if (points.length === 0) {return 0}
    points.sort((a, b) => a[0] - b[0]);
    let overlaps = [];
    let cur = points[0];
    for (let i = 1; i < points.length; i++) {
        let compare = points[i];
        if (compare[0] > cur[1]) {
            overlaps.push(cur);
            cur = compare
        } else {
            cur = [compare[0], Math.min(cur[1], compare[1])]
        }
    }
    return overlaps.length + 1 // last interval not added
};

// only track what is necessary
var findMinArrowShots2 = function(points) {
    if (points.length === 0) {return 0}
    points.sort((a, b) => a[0] - b[0]);
    let cur = points[0];
    let arrows = 0
    for (let i = 1; i < points.length; i++) {
        let compare = points[i];
        if (compare[0] > cur[1]) {
            arrows++
            cur = compare
        } else {
            cur = [compare[0], Math.min(cur[1], compare[1])]
        }
    }
    return arrows + 1 // last interval not added
};

//use a new arrow every time there is no overlap
var findMinArrowShots = function(points) {
    if (points.length === 0) {return 0}
    points.sort((a, b) => b[0] - a[0]);
    let arrows = 1;
    let arrowPos = points[0][0];
    for (let i = 1; i<points.length; i++) {
        if (points[i][1] < arrowPos) {
            arrows++;
            arrowPos = points[i][0]
        }
    }
    return arrows
};

const tests = [
    {points: [[10,16],[2,8],[1,6],[7,12]], out:2},
    {points: [], out:0},
    {points:[[5, 8], [-3, 6], [5, 22], [-3, 5]], out:1}
];

tests.forEach((t, i) => console.log(
    'test', i, findMinArrowShots(t.points) === t.out
))