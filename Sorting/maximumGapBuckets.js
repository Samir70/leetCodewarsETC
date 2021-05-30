const {maximumGapSlow} = require('./maximumGap')
// this bests 68% so much better than above
const maximumGap = nums => {
    if (nums.length < 2) {return 0}
    if (nums.length === 2) {return Math.abs(nums[0] - nums[1])}
    let max = Math.max(...nums), min = Math.min(...nums);
    if (max === min) {return 0}

    /**
     * if nums sorted was [3, ..., 52] with 5 elements then 
     * range = 52 - 3 = 49 and there are 4 gaps between the elements
     * so, if we go up in 12s
     * 3, 15, 27, 39, 51
     * We see that at least one of our steps needs to be bigger than 12
     * We need bins of max width 49 // 4 = 12
     * We would place 38 into bin (38 - min)//12 = 35//12 = 2 
     */
    let size = Math.floor((max - min) / (nums.length - 1)) || 1
    // console.log('max, min, size:', max, min, size)
    buckets = Array(nums.length - 1)
    for (let n of nums) {
        let b = Math.floor((n - min) / size)
        if (buckets[b] === undefined) {
            buckets[b] = [n, n]
        } else {
            buckets[b][0] = Math.min(buckets[b][0], n);
            buckets[b][1] = Math.max(buckets[b][1], n);
        }
    }
    // console.log(buckets)
    let first = 0;
    while (buckets[first] === undefined) {first++}
    let maxDiff = 0, prev = buckets[first][1];
    for (let i = first+1; i < nums.length; i++) {
        let cur = buckets[i] === undefined ? prev : buckets[i][0]
        maxDiff = Math.max(maxDiff, cur - prev)
        // console.log('cur, prev, maxDiff:', cur, prev, maxDiff)
        prev = buckets[i] === undefined ? prev : buckets[i][1]
    }
    return maxDiff
}

const justSort = nums => {
    nums.sort((a, b) => a - b);
    let maxDiff = 0
    for (let i = 1; i < nums.length; i++) {
        let diff = nums[i] - nums[i-1]
        if (diff > maxDiff) {maxDiff = diff}
    }
    return maxDiff
}

const test = []
for (let i = 0; i < 100000; i++) {test.push(Math.floor(Math.random()*1000000000))}
// console.log('test', test)//.slice(0, 10))
let start = new Date()
console.log(maximumGapSlow(test))
let mid = new Date()
console.log(maximumGap(test))
let mid2 = new Date()
console.log(justSort(test));
let end = new Date()
console.log('times', mid - start, mid2 - mid, end - mid2)