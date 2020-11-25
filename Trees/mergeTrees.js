var mergeTrees = function(t1, t2) {
    if (t1 === null) {return t2}
    if (t2 === null) {return t1}
    let newRootVal = (t1.val || 0) + (t2.val || 0);
    return new TreeNode(newRootVal, mergeTrees(t1.left, t2.left), mergeTrees(t1.right, t2.right))
};