const trees = require('../Trees/trees')

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
var inorderTraversalOld = function(root) {
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

// iterative without overwriting, copied from someone's java
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

/**
 * consider: 
 * Morris Traversal
 * In this method, we have to use a new data structure-Threaded Binary Tree, 
 * and the strategy is as follows:
 * 

    Step 1: Initialize current as root
    Step 2: While current is not NULL,

    If current does not have left child
        a. Add current’s value
        b. Go to the right, i.e., current = current.right

    Else
        a. In current's left subtree, make current the right child of the rightmost node
        b. Go to this left child, i.e., current = current.left

 * this modifies the tree, there is also a way to recover it.
 */

//recursive
// faster versions use concat at the end and have a helper function which is called over and over.
const inorderTravRec = root => {
    if (root === null) {return []}
    let l = inorderTraversal(root.left);
    let r = inorderTraversal(root.right);
    return [...l, root.val, ...r ]
};

console.log(inorderTraversal(trees.treeC))
