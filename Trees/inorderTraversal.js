const trees = require('./trees')

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
var inorderTraversal = function(root) {
    if (root === null) {return []}
    var inorder = [];
    var stack = [root];
    while (stack.length>0) {
        var current = stack.pop()
        console.log(JSON.stringify(current))
        if (current.right !== null) {
            stack.push(current.right)
            current.right = null
        }
        if (current.left !== null) {
            stack.push(current);
            stack.push(current.left)
            current.left = null
        } else {
            inorder.push(current.val)
        }
    }
    return inorder
};

const inorder2 = (t) => {
    var stack = [t];
    var out = []
    while (stack.length > 0) {
        var current = stack.pop();
        if (current !== null) {
            var l = current.left, r = current.right;
            if (l===null && r === null) {
                out.push(current.val)
            } else {
                current.left = null;
                current.right = null;
                stack.push(r, current, l)
            }
        }
    }
    return out
}

console.log(inorderTraversal(trees.treeC))
