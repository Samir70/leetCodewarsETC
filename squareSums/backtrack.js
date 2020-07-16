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
    // help cut down on backtracking by trying out numbers with fewest links first
    graphLinks.order = [...Array(n).keys()].map(x=>x+1).sort((a, b) => graphLinks[a].length - graphLinks[b].length)
    for (var l in graphLinks) {
        graphLinks[l].sort((a, b) => graphLinks[a].length - graphLinks[b].length)
    }
    return graphLinks
}

const wholePath = (path, m, n) => {
    // console.log(path, 'length:', path.length)
    if (path.length === n) {return path}
    var lastStep = path.slice(-1)[0];
    var nextSteps = m[lastStep].filter(x=>!path.includes(x));
    // console.log(nextSteps);
    for (var x of nextSteps){
        var outcome = wholePath([...path, x], m, n);
        if (outcome!==false) {return outcome}
    };
    return false
}

const findPath = (n) => {
    const rMap = roadMap(n)
    for (var node of rMap.order) {
        var outcome = wholePath([node], rMap, n)
        if (outcome !== false) { return outcome}
    }
    return false
}


// [...Array(5).keys()].map(x=>x+200).forEach(x=>console.log(x+':'+findPath(x)));
console.log(roadMap(33))