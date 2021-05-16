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