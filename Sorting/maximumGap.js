// Radix sort
const pad = (n, len) => {
    while (n.length < len) { n = '0' + n }
    return n
}
var maximumGapSlow = function (nums) {
    if (nums.length < 2) { return 0 }
    if (nums.length === 2) { return Math.abs(nums[0] - nums[1]) }
    // radix sort
    let bins = Array(10)
    for (let i = 0; i < 10; i++) { bins[i] = [] }
    let numStrings = [], maxLen = 0;
    for (let n of nums) {
        let ns = n.toString()
        if (ns.length > maxLen) { maxLen = ns.length }
        numStrings.push(ns)
    }
    numStrings = numStrings.map(ns => pad(ns, maxLen))
    // console.log(numStrings)
    for (let i = maxLen - 1; i >= 0; i--) {
        for (let ns of numStrings) {
            let d = Number(ns[i])
            bins[d].push(ns)
        }
        numStrings = []
        for (let j = 0; j < 10; j++) {
            numStrings = [...numStrings, ...bins[j]]
            bins[j] = []
        }
        // console.log(numStrings)
    }
    nums = numStrings.map(Number)
    let max = 0
    for (let i = 1; i < nums.length; i++) {
        max = Math.max(max, nums[i] - nums[i - 1])
    }
    return max
};

module.exports = {maximumGapSlow}