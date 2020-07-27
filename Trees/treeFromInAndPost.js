class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// slice is O(n), using pointers (passed into the buildTree function) is faster
var buildTree = function (inorder, postorder) {
    if (inorder.length === 0) { return null }
    if (inorder.length === 1) { return new TreeNode(inorder[0]) }
    var root = postorder[postorder.length - 1];
    var divide = inorder.indexOf(root);
    var inLeft = inorder.slice(0, divide), inRight = inorder.slice(divide + 1);
    var postLeft = postorder.slice(0, divide), postRight = postorder.slice(divide, -1)
    // console.log(inLeft, inRight, postLeft, postRight)
    var left = buildTree(inLeft, postLeft)
    var right = buildTree(inRight, postRight)
    return new TreeNode(root, left, right)
};

const tests = [
    { in: [9, 3, 15, 20, 7], post: [9, 15, 7, 20, 3] },
    { in: [1, 2, 3, 4], post: [4, 3, 2, 1] },
    { in: [9], post: [9] },
    { in: [], post: [] }
];

tests.forEach((t, i) => console.log(
    'test', i, buildTree(t.in, t.post)
))