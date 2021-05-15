/**
 * // Definition for a Node.
 * function Node(val,prev,next,child) {
 *    this.val = val;
 *    this.prev = prev;
 *    this.next = next;
 *    this.child = child;
 * };
 */

//  https://leetcode.com/problems/flatten-binary-tree-to-linked-list/

var flatten = function (head) {
    if (head === null) { return head }
    var stack = [head];
    var prev = null;
    while (stack.length > 0) {
        // console.log(stack.map(x => x !== null ? x.val : x))
        var current = stack.pop();
        if (current !== null) {
            // console.log(current.val)
            if (current.child !== null) {
                stack.push(current.next)
                current.next = current.child;
                //current.child.prev = current;
                stack.push(current.child)
            } else {
                stack.push(current.next)
            }
            current.child = null;
            current.prev = prev
            if (prev) { prev.next = current }
            // if (current.prev) {console.log('**********current{val, prev}', current.val, current.prev.val)}
            prev = current;
        } else {
            prev.next = null
        }
    }
    return head
};

/**
 * sgallivan:
 * Morris Traversal (O(1) Space, O(N) Time) Approach:
There is actually a way to traverse a binary tree with a space complexity of O(1)

The approach is called the Morris traversal. 
At its heart, it takes advantage of the basic nature of ordered traversals to 
iterate through and unwind the tree. In a pre-order traversal of a binary tree, 
each vertex is processed in (node, left, right) order. 
This means that the entire left subtree could be placed between the node and its right subtree.

To do this, however, we'll first have to locate the last node in the left subtree. 
This is easy enough, since we know that the last node of a pre-order tree can be found by moving 
right as many times as possible from its root.

So we should be able to move through the binary tree, 
keeping track of the curent node (curr). 
Whenever we find a left subtree, we can dispatch a runner to find its last node, 
then stitch together both ends of the left subtree into the right path of curr, 
taking heed to sever the left connection at curr.

Once that's done, we can continue to move curr to the right, 
looking for the next left subtree. When curr can no longer move right, 
the tree will be successfully flattened.
 * var flatten = function(root) {
    let curr = root
    while (curr) {
        if (curr.left) {
            let runner = curr.left
            while (runner.right) runner = runner.right
            runner.right = curr.right, curr.right = curr.left, curr.left = null
        }
        curr = curr.right
    }
};
 */