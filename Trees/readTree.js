const trees = require('./trees');

const readTree = root => {
    if (root === null) {return []};
    var values = [];
    var stack = [{v:root.val, node:root}];
    while (stack.length > 0) {
        var current = stack.pop();
        if (current.node.left !== null) {
            stack.push({v:current.v*10+current.node.left.val, node:current.node.left })
        }
        if (current.node.right !== null) {
            stack.push({v:current.v*10+current.node.right.val, node:current.node.right })
        }
        if (current.node.left === null && current.node.right === null) {
            values.push(current.v)
        }
    }
    return values
}

console.log(readTree(trees.treeD))