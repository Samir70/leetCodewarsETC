var convertBST = function (root) {
    let sum = 0;
    let stack = [];
    let cur = root;
    while (cur || stack.length) {
        while (cur) {
            stack.push(cur);
            cur = cur.right
        }
        cur = stack.pop();
        sum += cur.val;
        cur.val = sum;
        cur = cur.left;
    }
    return root
};

const tests = [
    [4, 1, 6, 0, 2, 5, 7, null, null, null, 3, null, null, null, 8],
    [0, null, 1],
    [1, 0, 2],
    [3, 2, 4, 1]
];

const outs = [
    [30, 36, 21, 36, 35, 26, 15, null, null, null, 33, null, null, null, 8],
    [1, null, 1],
    [3, 3, 2],
    [7, 9, 4, 10]
]