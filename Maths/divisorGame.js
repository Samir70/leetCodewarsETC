// 64ms beats 99%
var outcome = [null, false, true]
var divisorGame = function(n) {    
    while (outcome.length <= n) {
        let next = outcome.length
        for (let factor = 1; factor < next; factor++) {
            if (next % factor) {continue}
            // console.log('aiming for ', n, 'working on', next, 'can take', factor) 
            if (outcome[next - factor] === false) {
                outcome.push(true);
                break;
            }
        }
        if (outcome[next] === undefined) {outcome.push(false)}
        // console.log(outcome)
    }
    return outcome[n]
};