 var Solution = function(nums) {
    this.hash = {}
    for (let i = 0; i < nums.length; i++) {
        if (this.hash[nums[i]] === undefined) {this.hash[nums[i]] = []}
        this.hash[nums[i]].push(i)
    }
};

Solution.prototype.pick = function(target) {
    let choices = this.hash[target].length;
    let i = Math.floor(Math.random() * choices)
    return this.hash[target][i]
};

/** 
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.pick(target)
 */