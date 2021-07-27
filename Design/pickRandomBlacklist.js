// https://leetcode.com/problems/random-pick-with-blacklist/
var Solution = function(n, blacklist) {
    this.choices = n - blacklist.length;
    let alt = this.choices;
    this.hash = {}
    let bSet = new Set(blacklist)
    for (let b of blacklist) {
        if (b < this.choices) {
            while (bSet.has(alt)) {alt++}
            this.hash[b] = alt;
            alt++
        }
    }
    console.log(n, blacklist, this.choices, this.hash)
};

Solution.prototype.pick = function() {
    let r = Math.floor(Math.random() * this.choices)
    if (this.hash[r] !== undefined) {return this.hash[r]}
    return r
};

// faster version uses binary search on sorted blacklist array

/** 
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(n, blacklist)
 * var param_1 = obj.pick()
 */