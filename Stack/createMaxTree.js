
/**
 * @param {number[]} nums
 * @return {TreeNode}
 * https://leetcode.com/problems/maximum-binary-tree/
 */
// recursion
var constructMaximumBinaryTree = function (nums) {
  if (nums.length === 0) { return null }
  if (nums.length === 1) { return new TreeNode(nums[0]) }
  let max = -Infinity, idxMax = null
  for (let i = 0; i < nums.length; i++) {
      if (nums[i] > max) {
          max = nums[i]
          idxMax = i
      }
  }
  let left = constructMaximumBinaryTree(nums.slice(0, idxMax))
  let right = constructMaximumBinaryTree(nums.slice(idxMax + 1))
  return new TreeNode(nums[idxMax], left, right)
};
// monotonic stack
var constructMaximumBinaryTree = function(nums) {
  let stack = []
  for (let n of nums) {
      let cur = new TreeNode(n)
      while (stack.length && stack[stack.length - 1].val < n) {
          cur.left = stack.pop()
      }
      if (stack.length) {
          stack[stack.length - 1].right = cur
      }
      stack.push(cur)
  }
  return stack[0]
};
