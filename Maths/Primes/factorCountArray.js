const factorCountArray = n => {
    if (n < 1) {return null}
    if (n === 1) {return [1]}
    var out = Array(n+1).fill(2);
    out[1] = 1;
    var limit = Math.sqrt(n)
    for (var i = 2; i<=limit; i++) {
        
    }
    return out.slice(1)
}