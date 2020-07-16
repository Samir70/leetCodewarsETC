const shortPaths = {
    15: [8, 1, 15, 10, 6, 3, 13, 12, 4, 5, 11, 14, 2, 7, 9],
    16: [8, 1, 15, 10, 6, 3, 13, 12, 4, 5, 11, 14, 2, 7, 9, 16],
    17: [16, 9, 7, 2, 14, 11, 5, 4, 12, 13, 3, 6, 10, 15, 1, 8, 17],
    23: [18, 7, 9, 16, 20, 5, 11, 14, 22, 3, 1, 8, 17, 19, 6, 10, 15, 21, 4, 12, 13, 23, 2],
    25: [18, 7, 9, 16, 20, 5, 11, 25, 24, 12, 13, 23, 2, 14, 22, 3, 1, 8, 17, 19, 6, 10, 15, 21, 4]
}

const reachableSquares = (n) => {
    var limit = Math.floor(Math.sqrt(n + n - 1));
    return [...Array(limit)].map((x, i) => (i + 1) ** 2).slice(1)
}

const connectors = (arr, max) => (n) => arr.map(a => a - n).filter(x => x > 0 && x <= max && x !== n);

const roadMap = (n) => {
    const edgeList = connectors(reachableSquares(n), n);
    const graphLinks = {};
    [...Array(n).keys()].forEach(k => {
        graphLinks[k + 1] = edgeList(k + 1)//.map(x => [k + 1, x])
    });
    return graphLinks
}

const combinePaths = (p, q, rMap) => {
    if (p.join(',') === q.join(',')) {return []}
    const newPaths = [];
    const [left, right] = [p[0], p[p.length-1]];
    // console.log('p is: '+p);
    // console.log('q is: '+q);
    // console.log('need to find connections to ', left, right);
    const usefulLeft = rMap[left].filter(x => q.includes(x))
    const usefulRight = rMap[right].filter(x => q.includes(x))
    // console.log(usefulLeft, usefulRight);
    // add from connection (mate) to start of q, and from connection to end of q
    usefulRight.forEach(mate => {
        var newPath = [...p]
        var i = q.indexOf(mate);
        while (i>=0 && !p.includes(q[i])) {
            newPath.push(q[i]);
            i--
        }
        if (newPath.length>p.length) {newPaths.push(newPath)}
        newPath = [...p]
        i = q.indexOf(mate);
        while (i<q.length && !p.includes(q[i])) {
            newPath.push(q[i]);
            i++
        }
        if (newPath.length>p.length) {newPaths.push(newPath)}
    });
    usefulLeft.forEach(mate => {
        var newPath = [...p]
        var i = q.indexOf(mate);
        while (i>=0 && !p.includes(q[i])) {
            newPath.unshift(q[i]);
            i--
        }
        if (newPath.length>p.length) {newPaths.push(newPath)}
        newPath = [...p]
        i = q.indexOf(mate);
        while (i<q.length && !p.includes(q[i])) {
            newPath.unshift(q[i]);
            i++
        }
        if (newPath.length>p.length) {newPaths.push(newPath)}
    });
    return newPaths;
}

// test:
// console.log(combinePaths([ 2, 18, 7, 9, 16, 20, 5, 11, 25, 24, 12, 13 ], [ 2, 14, 22, 3, 1, 8, 17, 11, 19, 6 ], roadMap(26)))


// Take input like [2, 14, 22, 3, 1, 8, 17, 19, 6 ], [3, 10, 19]
// and provide an alternative like [ 2, 14, 22, 3, 6, 19, 17, 8, 1 ]
const turnEndRound = (path, mates) => {
    var len = path.length;
    if (len < 3) {return []};
    const goodMates = mates.map(x => path.indexOf(x)).filter(x => x>-1 && x <len-2);
    // console.log('goodMates:', goodMates);
    if (goodMates.length === 0) {return []}
    const altPaths = [];
    goodMates.forEach(gm => {
        const [left, right] = [path.slice(0, gm+1), path.slice(gm+1).reverse()];
        altPaths.push(left.concat(right))
    });
    return altPaths
}

const findSegments = (path, rMap, n) => {
    const splittingPoints = rMap[n].map(x => path.indexOf(x)).sort((a, b) => a-b);
    // console.log('need to split '+path, 'at indexes '+splittingPoints);
    const boundaries = splittingPoints.map((x, i, a) => i===0 ? [0, x] : [a[i-1]+1, x]);
    // console.log('The boundaries are ', boundaries);
    var segments = rMap[n].map(x => [x, n]);
    boundaries.forEach(x => segments.push(path.slice(x[0], x[1])));
    segments.push(path.slice(splittingPoints[splittingPoints.length-1]+1));
    // segments = segments.concat(segments.map(x => x.slice().reverse()));
    const turnedSegs = segments.map(x => turnEndRound(x, rMap[x[x.length-1]])).filter(x => x.length > 0);
    // most are faster without this, but 80 took forever without it.
    turnedSegs.forEach(segList => segList.forEach(seg => segments.push(seg)) );
    segments.sort((a, b) => b.length-a.length)
    // console.log('segments:::', segments);
    return segments
}

var  memo = {}
var callsToWholePath = 0;

const wholePath = (seg, segments, rMap, n) => {
    callsToWholePath++;
    if (seg.length === n) {return seg}
    if (memo[seg.join(',')] !== undefined) {return memo[seg.join(',')]}
    var newSegs = segments.map(x => combinePaths(seg, x, rMap));
    // console.log('newSegs for '+seg, newSegs);
    for (var nextSeg of newSegs) {
        if (nextSeg.length > 0) {
            for (var s of nextSeg) {
                // console.log('This is one s:'+s)
                var outcome = memo[s.join(',')] || wholePath(s, segments, rMap, n);
                memo[s.join(',')] = outcome;
                if (outcome !== false) {return outcome}
            }
        }
    }
    return false
}

const addStep = (path, n) => {
    const rMap = roadMap(n);
    const segments = findSegments(path, rMap, n);
    for (var seg of segments) {
        var outcome = wholePath(seg, segments, rMap, n);
        if (outcome !== false) {return outcome }
    }
    return false;
}

const squarePaths = (n) => {
    if (shortPaths[n] !== undefined) {return shortPaths[n]}
    if (n<26) {return false}
    var i = 26;
    var knownPath = shortPaths[25]
    while (i<=n) {
        memo = {}; callsToWholePath = 0;
        knownPath = addStep(knownPath, i);
        console.log('path for: '+ i + ' took '+callsToWholePath + ' calls to whole path' )
        // console.log(knownPath.join(','));
        i++
    }
    return knownPath
}

console.log(squarePaths(26).join(','))
// console.log(addStep(shortPaths[25], 26).join(','));
// console.log(turnEndRound([2, 14, 22, 3, 1, 8, 17, 19, 6 ], [3, 10, 19]))