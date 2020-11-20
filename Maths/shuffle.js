// Fisher-Yates shuffle algorithm
const shuffle = arr => {
    let out = [...arr];
    for (let i = out.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i+1)); // number 0..i
        [out[i], out[j]] = [out[j], out[i]]
    }
    return out
}

let test = [1, 2, 3];
let tally = {}
for (let i = 0; i<10000000; i++) {
    let rnd = shuffle(test);
    if (test[0] !== 1) {console.log('oops test was changed', test)}
    let key = rnd.join('');
    tally[key] = (tally[key] || 0) + 1
}

console.log('tally:', tally)