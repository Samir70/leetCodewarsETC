class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// slice is O(n), using pointers (passed into the buildTree function) is faster
var buildTree = function (inorder, preorder) {
    if (inorder.length === 0) { return null }
    if (inorder.length === 1) { return new TreeNode(inorder[0]) }
    var root = preorder[0];
    var divide = inorder.indexOf(root);
    var inLeft = inorder.slice(0, divide), inRight = inorder.slice(divide + 1);
    var preLeft = preorder.slice(1, 1+inLeft.length), preRight = preorder.slice(1+inLeft.length)
    console.log(inLeft, inRight, preLeft, preRight)
    var left = buildTree(inLeft, preLeft)
    var right = buildTree(inRight, preRight)
    return new TreeNode(root, left, right)
};

const tests = [
    { in: [9, 3, 15, 20, 7], pre: [3,9,20,15,7] },    
    { in: [1, 2, 3, 4], pre: [4, 3, 2, 1] },
    { in: [9], pre: [9] },
    { in: [], pre: [] }
];

tests.forEach((t, i) => console.log(
    'test', i, buildTree(t.in, t.pre)
))