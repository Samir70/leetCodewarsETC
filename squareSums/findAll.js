const reachableSquares = (n) => {
    var limit = Math.floor(Math.sqrt(n + n - 1));
    return [...Array(limit)].map((x, i) => (i + 1) ** 2).slice(1)
}

const connectors = (arr, max) => (n) => arr.map(a => a - n).filter(x => x > 0 && x <= max && x !== n);

const roadMap = (n) => {
    const edgeList = connectors(reachableSquares(n), n);
    const graphLinks = {};
    [...Array(n).keys()].forEach(k => {
        graphLinks[k+1] = edgeList(k+1).map(x=>[k+1, x])
    });
    return graphLinks
}

const combinePaths = (a1, a2) => 
    a2.some(x => a1.includes(x)) ? null : a1.concat(a2)

const combineAll = (rMap1, rMap2) => {
    const newMap = {}
    for (var l in rMap1) {
        newMap[l] = []
        rMap1[l].forEach(p => {
            lastStep = p[p.length - 1];
            rMap2[lastStep].forEach(n => {
                longerPath = combinePaths(p, n.slice(1))
                if (longerPath) {newMap[l].push(longerPath)}
            })
        })
    }
    return newMap
}

// var oneStep = roadMap(23);
// var twoStep = combineAll(oneStep, oneStep);
// var fourStep = combineAll(twoStep, twoStep);
// var eightStep = combineAll(fourStep, fourStep);
// var sixteenStep = combineAll(eightStep, eightStep);
// var twenty = combineAll(sixteenStep, fourStep);
// var twentyTwo = combineAll(twenty, twoStep)
// console.log(twoStep)

const findAll = (n) => {
    // a path with n numbers needs n-1 steps
    const binary = (n-1).toString(2);
    const doublePath = [roadMap(n)] // starts with 1 step paths
    // combine shorter paths to get longer paths
    // 2, 4, 8, ... step paths
    var i = 1, limit = binary.length;
    while (i < limit) {
        doublePath[i] = combineAll(doublePath[i-1], doublePath[i-1]);
        i++
    }
    var finalPath = doublePath[i-1]
    for (i = 1; i<limit; i++) {
        if (binary[i] === '1') {
            finalPath = combineAll(finalPath, doublePath[limit-1-i])
        } 
    }
    for (var p in finalPath) {
        if (finalPath[p].length > 0) {
            finalPath[p].forEach(x=>console.log('['+x+'],'))
        }
    }
    return finalPath
}

findAll(32)