
// Works but only need to keep track of difference and the index where this was first found
// Then local max = pointer - indexOf(last time this diff was found)
const longestBalanced = arr => {
    if (arr.length === 1) { return 0 }
    var diffs = {};
    var zerosAndOnes = [0, 0];
    var bestSoFar = 0;
    var pointer = 0;
    while (pointer < arr.length) {
        zerosAndOnes[arr[pointer]]++
        var diff = zerosAndOnes[1] - zerosAndOnes[0];
        if (diff === 0) {
            var currentCount = zerosAndOnes[0] + zerosAndOnes[1];
            bestSoFar = Math.max(bestSoFar, currentCount)
        } else {
            var message = 'need to balance a diff of ' + diff;
            if (diffs[diff]) {
                message+= ' Can delete the ones and zeros to index' + diffs[diff].index
                message += ' Which had '+diffs[diff].counts;
                var best = zerosAndOnes.map((x, i)=>x-diffs[diff].counts[i])
                message += ' to get '+best
                bestSoFar = Math.max(bestSoFar, best.reduce((a, b) => a+b))
            }
        }
        if (diffs[diff] === undefined) {
            diffs[diff] = { index: pointer, counts: [...zerosAndOnes] };
        }
        pointer++;
        // console.log(zerosAndOnes, message)
    }
    return bestSoFar
}

const longestBalanced2 = arr => {
    var history = { 0: -1 }
    var diff = 0;
    var longestFound = 0;
    arr.forEach((n, i) => {
        if (n === 1) { diff++ } else { diff-- }
        if (history[diff]) {
            found = i - history[diff];
            if (found > longestFound) {longestFound = found}
        } else {
            history[diff] = i
        }
    });
    return longestFound
}

const tests = [
    0, 2134234, 4564567, 324, 534, 3452345, 34534523, 54667, 56756, 23423, 127 * 16 + 7
].map(x => x.toString(2)).concat(['01']).map(x => x.split('').map(Number));

tests.forEach(t => {
    console.log(t, 'do they match?:', longestBalanced(t) === longestBalanced2(t))
});
