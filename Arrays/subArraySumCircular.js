const bruteForce = (arr) => {
    const len = arr.length;
    if (len === 1) { return arr[0] }
    var globalMax = -Infinity;
    for (var start = 0; start < len; start++) {
        var count = 1, sum = arr[start];
        var localMax = sum;
        while (count < len) {
            sum += arr[(start + count) % len];
            if (sum > localMax) { localMax = sum }
            count++
        }
        // console.log(localMax)
        // sums.push(localMax);
        if (localMax > globalMax) { globalMax = localMax }
    }
    return globalMax
}

const kadane = (arr) => {
    if (arr.length === 1) {return arr[0]}
    var maxToHere = arr[0], maxSoFar = arr[0];
    for (var i = 1; i<arr.length; i++) {
        if (maxToHere + arr[i] > arr[i]) {
            // get better subArray ending here by including ith element
            maxToHere += arr[i];
        } else {
            maxToHere = arr[i];
        }
        if (maxToHere > maxSoFar) { maxSoFar = maxToHere }
        // console.log('maxToHere, maxSoFar', maxToHere, maxSoFar)
    }
    return maxSoFar
}

const subArraySum = (arr) => {
    // if looping round is not needed, then kadane is enough
    var kad = kadane(arr);
    // if looping is needed, consider the numbers not used
    // they will have the biggest negative sum
    // find with kadane(negated arr)
    var altBest = arr.reduce((acc, val) => acc+val) + kadane(arr.map(x=>-x)); ;
    // but if arr is all negative, looping isn't a problem so should just go with kadane
    /**
     * [5, -3, 5] best is [5, 5] does not include the -3
     * -3 can be identified as 
     * kadane([-5, 3, -5]) = 3
     * kadane([5, -3, 5]) = 7
     */
    return altBest === 0 ? kad : Math.max(altBest, kad)
}

const onePass = (arr) => {
    var [total, globalMax, globalMin, curMax, curMin] = [arr[0], arr[0], arr[0], arr[0], arr[0]];
    for (var i = 1; i<arr.length; i++) {
        curMax = Math.max(curMax+arr[i], arr[i]);
        globalMax = Math.max(globalMax, curMax);
        curMin = Math.min(curMin + arr[i], arr[i]);
        globalMin = Math.min(globalMin, curMin);
        total += arr[i]
    }
    // console.log(arr.slice(0, 10), globalMin, globalMax, total)
    return total === globalMin ? globalMax : Math.max(total-globalMin, globalMax)
}


const tests = [
    { input: [1, -2, 3, -2], output: 3 },
    { input: [5, -3, 5], output: 10 },
    { input: [5, -3, 5, -3, 5], output: 12 },
    { input: [5, 5, -3, 5], output: 15 },
    { input: [3, -1, 2, -1], output: 4 },
    { input: [3, -2, 2, -3], output: 3 },
    { input: [3, -1, 10,-20, 2, -1, 3], output: 16 },
    { input: [-2, -3, -1], output: -1 }
];
tests.forEach(t => console.log(t.input, kadane(t.input), onePass(t.input) === t.output))

const rndTest = [...Array(30000)].map(x => Math.floor(Math.random() * 10) - 4);
console.log(bruteForce(rndTest))
console.log(subArraySum(rndTest))
console.log(onePass(rndTest))
