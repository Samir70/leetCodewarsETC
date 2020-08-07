const trees = require('./trees')

/**
 * root given coordinates, (x, y)
 * left = (x-1, y-1); right = (x+1, y-1)
 * so some nodes may be at same coordinate. In this case list by value.
 * read from left to right, top to bottom
 */

var verticalTraversal = function (root) {
    if (root === null) { return [] }
    var nodes = [], minX = 0;
    var out = [];
    var stack = [{ node: root, x: 0, y: 0 }];
    while (stack.length > 0) {
        var cur = stack.pop();
        nodes.push(cur);
        if (cur.x < minX) { minX = cur.x }
        if (cur.node.left) { stack.push({ node: cur.node.left, x: cur.x - 1, y: cur.y - 1 }) }
        if (cur.node.right) { stack.push({ node: cur.node.right, x: cur.x + 1, y: cur.y - 1 }) }
    }
    var offset = 0 - minX
    for (var n of nodes) {
        if (out[n.x + offset] === undefined) { out[n.x + offset] = [] }
        out[n.x + offset].push(n)
    }
    return out.map(x => x.sort((a, b) =>
        a.y === b.y ? a.node.val - b.node.val : b.y - a.y
        )).map(x => x.map(n => n.node.val))
};

console.log(verticalTraversal(trees.treeC))