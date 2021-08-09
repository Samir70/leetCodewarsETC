// 100ms, beats 96%
var wiggleSort = function(nums) {
    nums.sort((a, b) => a - b);
    let mid = nums.length % 2 ? (nums.length + 1) / 2 : nums.length / 2
    let left = nums.slice(0, mid), right = nums.slice(mid)
    let i = 0;
    // important to reverse so repeated median values are put as far apart as possible
    left.reverse(); right.reverse()
    // console.log(left, right)
    while (i < left.length) {
        let l = 2*i, r = l + 1;
        nums[l] = left[i]
        if (i < right.length) {nums[r] = right[i]}
        // console.log(nums)
        i++
    }
};