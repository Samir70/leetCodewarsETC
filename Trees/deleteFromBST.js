/**
 * delete node from BST, return the (new) root
 * I read the tree as preorder, deleted the val and made a new tree
 * beat about 30%
 */
const trees = require('./trees');

// Definition for a binary tree node.
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

const preorderTraversal = root => {
    if (root === null) { return [] }
    return [root.val].concat(preorderTraversal(root.left), preorderTraversal(root.right))
}
const bstFromPreorder = arr => {
    if (arr.length === 0) { return null }
    if (arr.length === 1) { return new TreeNode(arr[0])}
    const left = arr.filter(x => x<arr[0]);
    const right = arr.filter(x => x>arr[0]);
    return new TreeNode(arr[0], bstFromPreorder(left), bstFromPreorder(right))
}

const deleteNode = (root, key) => {
    let preorder = preorderTraversal(root).filter(k => k !== key);
    return bstFromPreorder(preorder)
}

console.log(deleteNode(trees.treeC, 8));