// speed, beat 20%
const zigzagLevelOrder = root => {
    if (root === null) {return []}
    var out = [];
    var stack = [{node:root, level:0}];
    while (stack.length>0) {
        var current = stack.pop()
        if (out[current.level] === undefined) {out[current.level] = []}
        out[current.level].push(current.node.val);
        if (current.node.right !== null) {stack.push({node:current.node.right, level:current.level + 1})}
        if (current.node.left !== null)  {stack.push({node:current.node.left, level:current.level + 1})}
    }
    out.map((r, i) => i %2 === 1 ? r.reverse() : r)
    return out
}


// faster was jeantimex:
var zigzagLevelOrder = function(root) {
    if (!root) return []; // Sanity check
    
    var result = [], level = [], s1 = [root], s2 = [], flag = true;
    
    while (s1.length > 0) {
        var node = s1.pop(), left = node.left, right = node.right;

        // Handle the current node
        level.push(node.val);

        // Get ready for the next level
        // the key of zigzag traversal is to control the order of pushing
        // left and right sub children
        if (flag) {
            if (left)  s2.push(left);
            if (right) s2.push(right);
        } else {
            if (right) s2.push(right);
            if (left)  s2.push(left);
        }
        
        // We just finish traversing the current level
        if (s1.length === 0) {
            result.push(level);
            level = [];
            flag = !flag;
            // Continue to traverse the next level
            s1 = s2; // point to same object
            s2 = []; // now s2 points to new object
        }
    }
    
    return result;
};