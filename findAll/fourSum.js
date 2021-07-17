const twoSum = (nums, i, t) => {
    let out = [], seen = new Set();
    // console.log('2sum', i, t)
    for (let j = i; j < nums.length; j++) {
        if (seen.has(nums[j])) {
            if (nums[j] * 2 === t) {out.push([nums[j], nums[j]])}
            continue
        }
        if (seen.has(t - nums[j])) {
            out.push([nums[j], t - nums[j]])
        }
        seen.add(nums[j])
    }
    return out
}
const threeSum = (nums, i, t) => {
    let out = [];
    // console.log('3sum', i, t)
    for (let j = i; j < nums.length; j++) {
        let rest = twoSum(nums, j+1, t - nums[j])
        if (rest.length > 0) {
            for (let r of rest) {out.push([nums[j], ...r])}
        }
    }
    return out
}
var fourSum = function(nums, target) {
    let out = [], added = new Set();
    for (let i = 0; i < nums.length; i++) {
        let rest = threeSum(nums, i+1, target - nums[i]);
        if (rest.length > 0) {
            for (let r of rest) {
                let poss = [nums[i], ...r].sort((a, b) => a - b)
                let key = poss.join(',');
                if (added.has(key)) {continue}
                out.push(poss); 
                added.add(key)
            }
        }
    }
    return out
};
