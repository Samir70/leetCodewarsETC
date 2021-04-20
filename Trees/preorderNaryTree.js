var preorder = function(root) {
    if (root === null) {return []}
    let out = [root.val]
    for (let child of root.children) {
        out = out.concat(preorder(child))
    }
    return out
};
