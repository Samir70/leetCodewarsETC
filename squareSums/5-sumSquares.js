const reachableSquares = (n) => {
    var limit = Math.floor(Math.sqrt(n+n-1));
    return [...Array(limit)].map((x, i) => (i+1)**2).slice(1)
}

const makeRoadMap = (n) => {
    const targetSqs = reachableSquares(n);
    // list the edges of a graph in an array.
    // if 4 and 9 are reachable squares, graphLinks[1] should have elements [3, 8]
    // order of elements not important.
    const graphLinks = [...Array(n+1)].map(x=>[]);
    targetSqs.forEach(sq => {
        for (var i = Math.min(n, sq-1); i>sq/2; i--) {
            var [a, b] = [i, sq-i];
            graphLinks[a].push(b);
            graphLinks[b].push(a);
            // console.log(i, sq-i)
        }
    });
    var summary = {
        empties: graphLinks.findIndex((x, i)=>i>0 && x.length===0),
        singles: graphLinks.reduce((acc, val, i) => val.length===1 ? [...acc, i] : acc, []), 
        graphLinks
    }
    return summary
}

const makeArray = (n) => {
    var {empties, singles, graphLinks} = makeRoadMap(n);
    if (empties !== -1) { return empties+' cannot make a square in list 1..'+n }
    if (singles.length > 2) {return 'Too many singles: '+singles.join(', ')+' when working with list 1..'+n}
    var paths = [[singles.length>0 ? singles[0] : n]];
    var bestSoFar = 1;
    while (paths.length>0) {
        var currentPath = paths.shift();
        if (currentPath.length > bestSoFar) {
            bestSoFar = currentPath.length;
            // console.log(currentPath.join())
        }
        if (currentPath.length === n) {return '['+currentPath.join()+'], //'}
        var lastNumber = currentPath[currentPath.length - 1]
        var nextSteps = graphLinks[lastNumber];
        nextSteps.forEach(x => {
            if (currentPath.indexOf(x) === -1) {paths.push([...currentPath, x])}
        })
        // console.log({currentPath, nextSteps, paths});
    }
    return false
}

const removeLinks = (rMap, arr) => rMap.map((x, i) => arr.indexOf(i) !== -1 ? 
    ['done'] : 
    x.filter(l => arr.indexOf(l) === -1)
);

var tests = [];
for (var i=4; i<30; i++) {tests.push(i)}

tests.forEach(n => {
    // console.log(n, removeLinks(makeRoadMap(n).graphLinks, [18, 25, 26]).map((x, i) => [i, ':', ...x]) );
    console.log(makeArray(n) || 'Could not find a path for '+ n);
})