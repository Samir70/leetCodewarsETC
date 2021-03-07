// to be valid, the point must be in same row or column
// go by Manhattan distance
var nearestValidPoint = function(x, y, points) {
    let bestI = Infinity, bestD = Infinity;
    for (let p = 0; p < points.length; p++) {
        let [i, j] = points[p]
        if (i === x || j === y) {
            let dist = Math.abs(x - i) + Math.abs(y - j);
            if (dist < bestD) {
                bestD = dist;
                bestI = p;
            }
        }
    }
    return bestI === Infinity ? -1 : bestI
};