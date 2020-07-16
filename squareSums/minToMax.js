const reachableSquares = (n) => {
    var limit = Math.floor(Math.sqrt(n + n - 1));
    return [...Array(limit)].map((x, i) => (i + 1) ** 2).slice(1)
}

const connectors = (arr, min, max) => (n) => arr.map(a => a - n).filter(x => x >= min && x <= max && x !== n);

const roadMap = (low, high) => {
    const edgeList = connectors(reachableSquares(high), low, high);
    const graphLinks = {};
    var fewestLinks = 10000000;
    var leastLinked = 0;
    [...Array(high-low+1).keys()].forEach(k => {
        var temp = edgeList(k + low);
        graphLinks[k + low] = temp;
        var len = temp.length;
        if (len<=fewestLinks) {
            fewestLinks = len;
            leastLinked = k+low
        }
    })
    return { leastLinked, graphLinks } //graphLinks.sort((a, b) => a.links.length - b.links.length)
}

const squarePaths = (low, n) => {
    if (n === 1) {return [1]}
    if (n<15) {return false}
    if ([18, 19, 20, 21, 22, 24].indexOf(n) !== -1) {return false}
    var {graphLinks:rMap, leastLinked:goodStart} = roadMap(low, n); 
    // console.log(rMap, goodStart);
    var path = [goodStart]
    var branchFrom = []; 
        // An array of objects recording 
        // indexes of the places where we can branch
        // and the choices not taken at those branches
    var addStep = 3; // useful to limit loops while debugging
    while (addStep) {
        var lastStep = path.slice(-1)[0];
        var choices = rMap[lastStep].filter(x=>path.indexOf(x) === -1);
        if (choices.length === 0) {
            // console.log(branchFrom);
            if (branchFrom.length === 0) {return false}
            var newBranch = branchFrom.pop();
            // console.log('path is:',path)
            // console.log('Change', path[newBranch.index], 'to one of', newBranch.options);
            nextStep = newBranch.options.pop();
            if (newBranch.options.length > 0) {
                branchFrom.push(newBranch)
            } // otherwise we have exhausted the choices at this step
            path = [...path.slice(0, newBranch.index), nextStep];
            // console.log(path);
            // console.log(branchFrom)
            // addStep--
        } else {
            // There are still choices
            var nextStep = choices.slice(-1)[0];
            var unusedChoices = choices.slice(0, -1);
            if (unusedChoices.length>0) {
                branchFrom.push({index:path.length, options:unusedChoices})
            }
            path.push(nextStep);
        }
        if (path.length === n-low+1) {addStep = false}
        // addStep--;
    }
    return path
}

// [23, 26, 27, 28, 29, 30 ].forEach(x => console.log(x, squarePaths(x)))
// [...Array(50).keys()].map(x=>x+35).forEach(x => console.log(x +' : ['+ squarePaths(x)+'],'))
// console.log(squarePaths(23))


var m = 30;
[...Array(50).keys()].map(x=>x+10).forEach(x=>console.log(m+'To'+(m+x)+': ['+squarePaths(m, m+x)+'],'))
// console.log(roadMap(16, 47))