const trees = require('./trees');

// easier backwards
const postOrder = root => {
    var out = [];
    var stack = [root]
    while (stack.length>0) {
        // console.log(stack.map(x => x ? x.val : 0), out.join('->'))
        var c = stack.pop();
        while (c === null) {c = stack.pop()}
        if (c.left || c.right) {
            stack.push(c, c.right, c.left);
            c.left = null;
            c.right = null;
        } else {
            if (c !== null) {out.push(c.val)}
        }
    }
    return out
}

for (var t in trees) {
    console.log(postOrder(trees[t]))
}