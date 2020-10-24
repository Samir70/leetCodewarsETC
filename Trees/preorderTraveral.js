/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

// my sol, recursion
var preorderTraversal = function(root) {
    if (root === null) {return []}
    return [root.val].concat(preorderTraversal(root.left), preorderTraversal(root.right))
};


// alt via leet
function traverse(node, arr) {
    if(node) {
        arr.push(node.val)
    }
    if(node.left) {
        traverse(node.left, arr)
    }
    if(node.right) {
        traverse(node.right, arr)
    }
}

var preorderTraversal = function(root) {
    if(!root) return [];
    let arr = [];
    traverse(root, arr)
    return arr
};

// iterative:
const preorderTraversal = (root) => {
    let out = [];
    let cur = root;
    let rights = [];
    while (cur !== null) {
        out.push(cur.val);
        if (cur.right) {rights.push(cur.right)}
        cur = cur.left;
        if (cur === null && rights.length > 0) {
            cur = rights.pop()
        }
    }
    return out
}
