// [84%, 67%]
var deleteDuplicates = function(head) {
    let dummy = new ListNode(0)
    let cur = dummy;
    let pointer = head
    while (pointer) {
        let foundDup = null;
        while (pointer.next && pointer.next.val === pointer.val) {
            foundDup = pointer.val;
            pointer = pointer.next
        }
        if (pointer.val !== foundDup) {
            cur.next = pointer;
            cur = cur.next
        }
        pointer = pointer.next
    }
    cur.next = null
    return dummy.next
};