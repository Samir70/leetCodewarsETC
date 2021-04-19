var combinationSum4 = function(nums, target) {
    let dp = new Array(target+1).fill(0);
    dp[0] = 1;
    for(let i = 1; i < target+1; i++) {
        for(let j = 0; j < nums.length; j++) {
            if(i-nums[j]<0) continue;
            dp[i] += dp[i-nums[j]];
        }
    }
    return dp[target];
};

/*
      0  1  2  3  4
dp = [1, 0, 0, 0, 0]
dp = [1, 1, 2, 4, 7]

dp[0] = []
dp[1] = [1]
dp[2] = [1,1], [2]
dp[3] = [1,1,1], [2,1], [1,2], [3]
dp[4] = [1,1,1,1], [2,1,1], [1,2,1], [3,1], [1,1,2], [2,2], [1,3]

It's a bit of a tricky problem due to the base case i think

At every dp[i] you check every number and subtract from i. 
If it's more than 0, add that dp[i] += dp[i-num]

As you can see from dp illustration above, this is because we add that number to every possible solution at dp[i-num]

// my answer:
const hash = {}
var combinationSum4 = function(nums, target) {
    let out = 0;
    let key = nums.join(',') + '->' + target
    if (hash[key] !== undefined) {return hash[key]}                        
    for (let n of nums) {
        if (n < target) {out += combinationSum4(nums, target - n)}
        if (n === target) {out++}
    }
    hash[key] = out
    // console.log(hash)
    return out
};
