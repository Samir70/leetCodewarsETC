const trees = require('./trees');

const levelOrder = root => {
    if (root === null) {return []}
    var out = [];
    var stack = [{node:root, level:0}];
    while (stack.length>0) {
        var current = stack.pop()
        console.log(current)
        if (out[current.level] === undefined) {out[current.level] = []}
        out[current.level].push(current.node.val);
        if (current.node.right !== null) {stack.push({node:current.node.right, level:current.level + 1})}
        if (current.node.left !== null)  {stack.push({node:current.node.left, level:current.level + 1})}
    }
    return out
}

console.log(levelOrder(trees.treeC))