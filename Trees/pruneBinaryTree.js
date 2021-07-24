// 60ms, beats 100%
var pruneTree = function(root) {
    if (root === null) {return null}
    // if (root.left === null && root.right === null) {
    //     // found a leaf
    //     return root.val === 0 ? null : root
    // }
    let left = pruneTree(root.left), right = pruneTree(root.right)
    if (left === null && right === null) {
        root.left = left; root.right = right;
        return root.val === 0 ? null : root
    }
    root.left = left; root.right = right;
    return root
};
