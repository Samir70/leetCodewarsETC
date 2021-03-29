var flipMatchVoyage = function(root, voyage) {
    let out = [];
    let stack = [root];
    let v = 0;
    while (stack.length) {
        let cur =  stack.pop()
        if (cur === null) {continue}
        if (cur.val !== voyage[v]) {return [-1]}
        v++;
        if (cur.right && cur.right.val === voyage[v]) {
            stack.push(cur.left)
            stack.push(cur.right)
            if (cur.left) {out.push(cur.val)}
        } else {
            stack.push(cur.right);
            stack.push(cur.left)
        }
    }
    return out
};

const tests = [

    { tree: [1, 2], voyage: [2, 1] },
    { tree: [1, 2, 3], voyage: [1, 3, 2] },
    { tree: [1, 2, 3], voyage: [1, 2, 3] },
    {
        tree: [7, 1, 5, null, null, 3, 2, null, null, 6, 4, null, null, null, null],
        voyage: [7, 5, 2, 4, 3, 6, 1]
    }
]