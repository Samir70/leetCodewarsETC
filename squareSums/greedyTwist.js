const reachableSquares = (n) => {
    var limit = Math.floor(Math.sqrt(n + n - 1));
    return [...Array(limit)].map((x, i) => (i + 1) ** 2).slice(1)
}

const connectors = (arr, max) => (n) => arr.map(a => a - n).filter(x => x > 0 && x <= max && x !== n);

const roadMap = (n) => {
    const edgeList = connectors(reachableSquares(n), n);
    const graphLinks = {};
    [...Array(n).keys()].forEach(k => {
        graphLinks[k+1] = edgeList(k+1)
    });
    // Lower chance of reaching a dead end by using least linked first.
    graphLinks.order = [...Array(n).keys()].map(x=>x+1).sort((a, b) => graphLinks[a].length - graphLinks[b].length)
    // can save a bit of time without much loss of performance for larger numbers by omitting sorting
    // choices below would then have best choice at the end.
    for (var l in graphLinks) {
        graphLinks[l].sort((a, b) => graphLinks[a].length - graphLinks[b].length)
    }
    return graphLinks
}

const naivePathFrom = (rMap, seed) => {
    var path = [seed];
    var takeStep = 15000; // rather than boolean to control how many loops in development
    while (takeStep) {
        var choices = rMap[path[path.length-1]].filter(x => !path.includes(x));
        if (choices.length === 0) {
            takeStep = 0
        } else {
            path.push(choices[0]);
            takeStep--
        }
    }
    return path
}

const squarePath = (n) => {
    const rMap = roadMap(n);
    // might be worth working from the other end to increase the number of twists in first round
    var bestNaivePath = naivePathFrom(rMap, rMap.order[0]);
    if (bestNaivePath.length === n) {return bestNaivePath}
    for (var i = 1; i<10; i++) {
        const alt = naivePathFrom(rMap, rMap.order[i]);
        if (alt.length > bestNaivePath.length) {bestNaivePath = alt}
    }
    console.log('best '+ bestNaivePath, 'length::: ', bestNaivePath.length)
    return false
}

const start = new Date().getTime();
squarePath(140)
const end = new Date().getTime();
console.log(end - start, 'ms') // takes 444ms for 1400, checking 1 path; 1774 for 10 
// 1022 without final sorting, but this lowers bestNaivePath.length to 1210 from 1397
// 1700-1718 without final sorting, and best path length 1392

// aiming for 133:
// starting from  128 96
// starting from  122 105
// starting from  121 108
// starting from  107 127
// starting from  129 111
// starting from  127 115
// starting from  126 105
// starting from  125 112
// starting from  124 123
// starting from  123 115

//aiming for 35
// starting from  18 29
// starting from  28 32
// starting from  27 27
// starting from  25 34
// starting from  26 13
// starting from  32 33
// starting from  30 34
// starting from  8 33
// starting from  9 32