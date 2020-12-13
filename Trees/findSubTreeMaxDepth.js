// speed, memory = 44%, 14%
var subtreeWithAllDeepest = function(root) {
    root.depth = 0;
    let stack = [root];
    let deepest = [0, root]
    while (stack.length > 0) {
        let cur = stack.pop();
        if (cur.left) {
            cur.left.depth = cur.depth+1;
            cur.left.parent = cur;
            if (cur.depth+1 === deepest[0]) {deepest.push(cur.left)}
            if (cur.depth+1 > deepest[0]) {deepest = [cur.depth+1, cur.left]}
            stack.push(cur.left)
        }
        if (cur.right) {
            cur.right.depth = cur.depth+1;
            cur.right.parent = cur;
            if (cur.depth+1 === deepest[0]) {deepest.push(cur.right)}
            if (cur.depth+1 > deepest[0]) {deepest = [cur.depth+1, cur.right]}
            stack.push(cur.right)
        }
    }
    console.log(deepest);
    if (deepest.length === 2) {return deepest[1]}
    deepest.shift();
    let diffNodes = true
    while (diffNodes) {
        diffNodes = false;
        deepest = deepest.map(c => c.parent);
        for (let i =1; i<deepest.length; i++) {
            if (deepest[i] !== deepest[i-1]) {diffNodes = true}
        }
    }
    return deepest[0]
};

const tests = [
    [3,5,1,6,2,0,8,null,null,7,4], //[2,7,4]
    [1], //[1]
    [1, 2], // [2]
    [0,1,null,3,2,6,null,5,4] // [1,3,2,6,null,5,4]

]