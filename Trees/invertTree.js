/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
// 68ms
var invertTree = function(root) {
    if (root === null) {return null}
    var temp = root.left === null ? null : invertTree(root.left);
    root.left = root.right === null ? null : invertTree(root.right);
    root.right = temp
    return root
};

/*
The above was faster than guaranteeing a call to invert tree for left/right being null
But not by much.
This was 72ms
var invertTree = function(root) {
    if (root === null) {return null}
    let temp = invertTree(root.right)
    root.right = invertTree(root.left)
    root.left = temp
    return root
};
*/

// via Leetcode
var invertTree2 = function(root) {
    if (root) {
        [root.left, root.right] = [invertTree(root.right), invertTree(root.left)]
    }
    return root
};

const invert = root => {
    if (root === null) {return null}
    var stack = [root];
    while (stack.length>0) {
        var c = stack.pop();
        [c.left, c.right] = [c.right, c.left];
        // this way to swap did not work on leetCode, had to use temp = L; L = R; R = temp
        if (c.left !== null) {stack.push(c.left)}
        if (c.right !== null) {stack.push(c.right)}
    }
    return root
}
