// beats nearly 10%
const maxSatisfaction = arr => {
    arr.sort((a, b) => a - b);
    if (arr[0] >= 0) {return arr.reduce((acc, val, i) => acc + val*(i+1), 0)}
    if (arr[arr.length - 1] <= 0) {return 0}
    // find first non negative
    let left = 0, right = arr.length - 1;
    while (left < right) {
        let mid = Math.floor((left+right)/2)
        if (arr[mid] < 0) {
            left = mid+1
        } else {
            right = mid
        }
    }
    let nonNegs = arr.slice(left);
    // console.log(arr, left, nonNegs);
    left--;
    let maxSat = nonNegs.reduce((acc, val, i) => acc + val*(i+1), 0);
    let stepUp = nonNegs.reduce((acc, val) => acc+val, 0);
    // console.log(maxSat, stepUp)
    while (left >= 0) {
        // console.log('including ', arr[left])
        stepUp += arr[left--];
        if (stepUp < 0) {return maxSat}
        maxSat += stepUp;
        // console.log('newSat', maxSat)
    }
    return maxSat
}

const tests = [
    { satis: [-1, -8, 0, 5, -7], out: 14 },
    { satis: [4, 3, 2], out: 20 },
    { satis: [-1, -4, -5], out: 0 },
    { satis: [-2, 5, -1, 0, 3, -3], out: 35 }
]

tests.forEach((t, i) => console.log(
    'test', i, maxSatisfaction(t.satis) === t.out
))