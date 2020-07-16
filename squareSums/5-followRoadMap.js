const reachableSquares = (n) => {
    var limit = Math.floor(Math.sqrt(n + n - 1));
    return [...Array(limit)].map((x, i) => (i + 1) ** 2).slice(1)
}

const connectors = (arr, max) => (n) => arr.map(a => a - n).filter(x => x > 0 && x <= max && x !== n);

const roadMap = (n) => {
    const graphLinks = {}
    const temp = {};
    const tempProps = ['empties', 'singles', 'doubles'];
    tempProps.forEach(p => temp[p] = [])
    const edgeList = connectors(reachableSquares(n), n);
    [...Array(n).keys()].forEach(k => {
        graphLinks[k + 1] = edgeList(k + 1);
        var len = graphLinks[k + 1].length;
        if (len < 3) {
            temp[tempProps[len]].push(k + 1)
        }
    });
    var routeExists = true;
    var reason = 'I am optimistic';
    var goodStart = [];
    if (temp['empties'].length > 0) {
        routeExists = false;
        reason = temp['empties'] + ' cannot make a square in list 1..' + n
    }
    if (temp['singles'].length > 2) {
        routeExists = false;
        reason = 'Too many singles: ' + temp['singles'].join(', ') + ' when working with list 1..' + n
    } else {
        if (temp['singles'].length > 0) {
            var start = temp['singles'][0];
            var next = graphLinks[start].slice(-1)[0]
            goodStart = [start, next];
        } else {
            if (temp['doubles'].length > 0) {
                var mid = temp['doubles'][0];
                var [left, right] = graphLinks[mid];
                goodStart = [left, mid, right]
            } else { goodStart = [n] }
        }
    }
    return {
        ...temp,
        targetLength: n,
        routeExists,
        reason,
        goodStart,
        graphLinks
    }
}

const highestUnused = (choices, used) => {
    var temp = choices.filter(c => !used.includes(c))
    return temp.length === 0 ? null : temp.slice(-1)[0]
}

const splitLoopAt = (arr, val) => {
    var i = arr.indexOf(val);
    return arr.slice(i + 1).concat(arr.slice(0, i + 1))
}

const followMap = (rMap, seed) => {
    var journey = seed || rMap.goodStart;
    console.log('Need', rMap.targetLength, 'steps. Starting with', journey.join(', '));
    if (!rMap.routeExists) { return rMap.reason }
    var takeStep = 100; // useful to limit the number of steps the below loop can take.
    var ignoreLoop = false;
    var bestSoFar = journey.length;
    var chancesTaken = {};
    while (takeStep) {
        var lastStep = journey.slice(-1)[0];
        var posNextSteps = rMap.graphLinks[lastStep];
        var nextStep = highestUnused(posNextSteps, journey);
        // console.log('last step was', lastStep, 'possible next', posNextSteps, 'will choose', nextStep);
        if (nextStep === null) {
            var [l, r] = [journey[0], journey.slice(-1)[0]];
            // console.log('journey stopped at', journey.join(', '));
            // console.log('ends are ', l, r, 'left+right = square::', rMap.graphLinks[l].includes(r));
            var chances = journey.filter(x => highestUnused(rMap.graphLinks[x], journey));
            // console.log('We may have a chance with one of', chances);
            if (rMap.graphLinks[l].includes(r) && !ignoreLoop) {
                // console.log('We have a loop, can I break it somewhere with options?');
                if (chances.length > 0) {
                    journey = splitLoopAt(journey, chances[0]);
                    // console.log('new journey', journey.join(','))
                } else {
                    console.log('No useful places to break loop, I will stop')
                    ignoreLoop = true
                }
            } else {
                if (chances.length > 0) {
                    var bestChance = chances
                        .reduce((acc, val) => (chancesTaken[val] || 0) <= (chancesTaken[acc] || 0) ? val : acc);
                    var pos = journey.indexOf(bestChance);
                    if (pos < journey.length / 2) {
                        journey.reverse();
                        // console.log('Reversing journey to give that a go')
                    } else {
                        chancesTaken[bestChance] = (chancesTaken[bestChance] || 0) + 1;
                        var altStep = highestUnused(rMap.graphLinks[bestChance], journey);
                        // console.log('Not a loop, best chance is', bestChance, 'going to ', altStep);
                        journey = [...journey.slice(0, journey.indexOf(bestChance)+1), altStep];
                    }
                    // console.log('new journey', journey.join(','));
                    // console.log('Chances taken: ', chancesTaken)
                    takeStep--
                } else {
                    // console.log('No loop, no useful chances. I will stop.')
                    takeStep = false
                }
            }
        } else {
            journey.push(nextStep)
        }
        if (journey.length > bestSoFar) {
            bestSoFar = journey.length;
            if (bestSoFar%50===0 || bestSoFar > 950) {console.log(bestSoFar)}
        }
    }
    return journey.length === rMap.targetLength ? 'found path'+journey : [false]
}

// var [start, end] = [10, 55];
// for(var i = start; i<=end; i++) {
//     console.log(i, followMap(roadMap(i)));
// }

console.log(roadMap(34))

// console.log(followMap(roadMap(33)).join(','))

module.exports = { roadMap }