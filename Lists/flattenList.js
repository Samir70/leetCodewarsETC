/**
 * // Definition for a Node.
 * function Node(val,prev,next,child) {
 *    this.val = val;
 *    this.prev = prev;
 *    this.next = next;
 *    this.child = child;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */

var flatten = function(head) {
    if (head === null) {return head}
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
            if (prev) {prev.next = current}
            // if (current.prev) {console.log('**********current{val, prev}', current.val, current.prev.val)}
            prev = current;
        } else {
            prev.next = null
        }
    }
    return head
};