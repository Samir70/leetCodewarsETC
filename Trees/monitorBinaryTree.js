// min number of cameras tp monitor a tree
// https://leetcode.com/problems/binary-tree-cameras/solution/
var minCameraCover = function(root) {
    let count = 0;
    const dfs = node => {
        if (node === null) {return 0}
        let below = dfs(node.left) + dfs(node.right)
        if (below === 0) {return 3}
        if (below < 3) {return 0}
        count++
        return 1
    }
    return dfs(root) > 2 ? count + 1 : count
};

/**
 * A val of 0 means that there's no pressing need to place a camera on this node 
 * because nothing below needs one. On the other hand, 
 * it also means that this node is unmonitored, 
 * otherwise val would be at least a 1. 
 * So rather than placing a camera here, we want to place one in the parent node. 
 * That means that we send a 3 up to let the parent know that we need it to place a camera.

A leaf node will have a val of 0, yes, because both of its children are null, 
so it will send a 3 up to its parent. 
But a node that is covered from below and does not need a camera will also send up a 0, 
because its parent can basically treat it as if it's a null branch.
 */