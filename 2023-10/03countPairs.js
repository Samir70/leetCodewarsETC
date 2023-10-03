/**
 * pairs of numbers i, j such that
 * nums[i] === nums[j] and i != j
 * 
 * my sol: tally and use t choose 2
 * but this Tri(t-1), or 1+2+3...+(t-1)
 */

var numIdenticalPairsOld = function(nums) {
    var tally = Array(101).fill(0);
    for (var n of nums) {tally[n]++}
    return tally.map(t => t < 2 ? 0 : (t*(t-1))/2)
        .reduce((a, b) => a+b, 0)
};


var numIdenticalPairs = nums => {
    var tally = Array(101).fill(0);
    var out = 0;
    for (var n of nums) {
        out += tally[n]++;
    }
    return out
}

var test = [...Array(100000)].map(x => Math.floor(Math.random() * 100)+1)
console.log(numIdenticalPairs(test), numIdenticalPairsOld(test))