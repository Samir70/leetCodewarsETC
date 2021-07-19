// 100ms beats 54%
// https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/
var lowestCommonAncestor = function(root, p, q) {
    if (root === p) {return p}
    if (root === q) {return q}
    root.level = 0; root.parent = null;
    // console.log('before', p, q);
    let stack = [root];
    while (stack.length) {
        let cur = stack.pop()
        if (cur.left !== null) {
            cur.left.parent = cur;
            cur.left.level = cur.level + 1;
            stack.push(cur.left)
        }
        if (cur.right !== null) {
            cur.right.parent = cur;
            cur.right.level = cur.level + 1;
            stack.push(cur.right)
        }
    }
    // console.log('after', p.level, q.level);
    let pAnc = p, qAnc = q;
    while (pAnc.level > qAnc.level) {pAnc = pAnc.parent}
    while (pAnc.level < qAnc.level) {qAnc = qAnc.parent}
    // console.log('same level', pAnc, qAnc)
    while (pAnc !== qAnc) {
        pAnc = pAnc.parent;
        qAnc = qAnc.parent;
    }
    return pAnc
};

// for a BST we can take advantage of the sorting that has been done:
// https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/
var lowestCommonAncestor = function(root, p, q) {
    while (root !== p && root !== q ) {
        if (p.val > root.val && q.val > root.val) {
            root = root.right
        } else if (p.val < root.val && q.val < root.val) {
            root = root.left
        } else {
            return root
        }
    }
    return root
};
