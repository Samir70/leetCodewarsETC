const reachableSquares = (n) => {
    var limit = Math.floor(Math.sqrt(n + n - 1));
    return [...Array(limit)].map((x, i) => (i + 1) ** 2).slice(1)
}

const wholePath = (path, sqs, n) =>{
    if (path.length === n) { return path}
    const last = path.slice(-1)[0];
    const nextSteps = sqs.filter(x => x > last).map(x => x-last).filter(x => !path.includes(x) && x <= n);
    // console.log('path: '+path, 'next steps: '+nextSteps);
    for (var x of nextSteps){
        var outcome = wholePath([...path, x], sqs, n);
        if (outcome!==false) {return outcome}
    };
    return false
}

const findPath = (n) => {
    var squares = reachableSquares(n);
    for (var s = n; s>0; s--) {
        var outcome = wholePath([s], squares, n);
        if (outcome !== false) {return outcome}
    }
    return false
}

for (var i = 15; i<50; i++) {
    console.log(i+' has final answer:',''+findPath(i))
}