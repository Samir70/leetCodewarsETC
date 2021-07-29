// 72ms beats 99.5%
var sortedArrayToBST = function(nums) {
    if (nums.length === 0) {return null}
    if (nums.length === 1) {return new TreeNode(nums[0])}
    if (nums.length === 2) {return new TreeNode(nums[1], new TreeNode(nums[0]))}
    let mid = nums.length % 2 ? (nums.length - 1) / 2 : nums.length / 2
    return new TreeNode(nums[mid], sortedArrayToBST(nums.slice(0, mid)), sortedArrayToBST(nums.slice(mid+1)))
};
