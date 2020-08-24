var sumOfLeftLeaves = function (root) {
    if (root === null) { return 0 }
    let sum = 0;
    let stack = [root]
    while (stack.length > 0) {
        let cur = stack.pop()
        if (cur.left !== null) {
            stack.push(cur.left)
            if (cur.left.left === null && cur.left.right === null) {
                sum += cur.left.val
            }
        }
        if (cur.right !== null) {
            stack.push(cur.right)
        }
    }
    return sum
};

