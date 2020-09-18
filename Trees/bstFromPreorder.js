// Definition for a binary tree node.
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

// mine wasn't, but fastest on leetcode is also recursive
const bstFromPreorder = (arr) => {
    if (arr.length === 0) { return null }
    if (arr.length === 1) { return new TreeNode(arr[0])}
    const left = arr.filter(x => x<arr[0]);
    const right = arr.filter(x => x>arr[0]);
    return new TreeNode(arr[0], bstFromPreorder(left), bstFromPreorder(right))
}
/**
 * fastest worded:
 * var bstFromPreorder = function(preorder) {
    if(!preorder || !preorder.length) return null;
    if(preorder.length==1) return new TreeNode(preorder[0]);
    
    let root=new TreeNode(preorder[0]);
    root.left=bstFromPreorder(preorder.filter(p=>p<root.val));
    root.right=bstFromPreorder(preorder.filter(p=>p>root.val));
    
    return root;
};
 */


// iterative, with stack
const bstFromPreorder2 = (arr) => {
    if (arr.length === 0) {return null}
    var root = new TreeNode(arr[0]);
    var stack = [root];
    const peek = () => stack[stack.length - 1]
    arr.slice(1).forEach(n => {
        if (n < peek().val) {
            peek().left = new TreeNode(n);
            stack.push(peek().left)
        } else {
            while (stack.length > 0 && peek().val < n) {
                var last = stack.pop()
            }
            last.right = new TreeNode(n);
            stack.push(last.right)
        }
    })
    return root
}

// a little slower, 88ms
var bstFromPreorder3 = function(preorder) {
    if (preorder.length === 0) {return null}
    let root = new TreeNode(preorder[0]);
    let stack = [root];
    let p = 1;
    while (p < preorder.length) {
        let cur = stack.pop();
        let newVal = preorder[p]
        if (newVal < cur.val) {
            cur.left = new TreeNode(newVal)
            stack.push(cur);
            stack.push(cur.left)
        } else {
            while (stack.length > 0 && stack[stack.length - 1].val < newVal) {
                cur = stack.pop()
            }
            cur.right = new TreeNode(newVal);
            stack.push(cur.right)
        }
        p++
    }
    return root
};

// further research:
// https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/discuss/252232/JavaC%2B%2BPython-O(N)-Solution

/**
 * 64ms via leetcode:
 * var bstFromPreorder = function(preorder) {
    if (!preorder.length) {
        return null;
    }
    
    let preIndex = 0;
    
    return rdeserialize(-Infinity, Infinity);
    
    function rdeserialize(lower, upper) {
        if (preIndex === preorder.length) {
            return null;
        }
        
        const val = preorder[preIndex];
        
        if (val < lower || val > upper) {
            return null;
        }
        
        preIndex++;
        const node = new TreeNode(val);
        node.left = rdeserialize(lower, val);
        node.right = rdeserialize(val, upper);
        return node;
    }
};
 */


const tests = [
    {in: [5,1,7], out: [5,1,7]},
    {in: [10,12], out: [10, null,12]},
    {in: [8,5,1,7,10,12], out: [8,5,10,1,7,null,12]},
    {in: [9, 7, 5, 8, 10], out: []}
]

tests.forEach(t => console.log(JSON.stringify(bstFromPreorder(t.in), null, 2)))

tests.forEach(t => {
    var recurse = JSON.stringify(bstFromPreorder(t.in));
    var iterate = JSON.stringify(bstFromPreorder2(t.in));
    console.log(t.in, recurse === iterate);
})
