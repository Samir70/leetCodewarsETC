/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var balanceBST = function (root) {
    let inorder = inorderTraversal(root)
    // console.log(inorder)
    return arr2BST(inorder)
};
const inorderTraversal = root => {
    let inorder = [];
    let stack = [];
    let cur = root
    while (cur || stack.length) {
        while (cur) {
            stack.push(cur);
            cur = cur.left;
        }
        cur = stack.pop();
        inorder.push(cur.val);
        cur = cur.right
    }
    return inorder
};
const arr2BST = arr => {
    if (arr.length === 0) { return null }
    if (arr.length === 1) { return new TreeNode(arr[0]) }
    let mid = Math.floor(arr.length / 2)
    let left = arr2BST(arr.slice(0, mid))
    let right = arr2BST(arr.slice(mid + 1))
    return new TreeNode(arr[mid], left, right)
}