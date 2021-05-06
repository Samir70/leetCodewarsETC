var sortedListToBST = function(head, tail = null) {
    if (head === tail) {return null}
    let fast = head, slow = head;
    while (fast !== tail && fast.next !== tail) {
        slow = slow.next;
        fast = fast.next.next
    }
    return new TreeNode(slow.val, sortedListToBST(head, slow), sortedListToBST(slow.next, tail))
};