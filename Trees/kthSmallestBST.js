// Definition for a binary tree node.
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

var kthSmallest = function(root, k) {
    // case k = 1, find node at left most (root if none);
    var current = root, previous = null;
    while (current.left !== null) {
        previous = current;
        current = current.left;        
    }
    if (k === 1) { return current.val} 
    if (current === root) { return kthSmallest(current.right, k-1)}
    previous.left = current.right
    return kthSmallest(root, k-1)
};