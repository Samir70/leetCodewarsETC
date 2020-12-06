/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

// lists are sorted already
var mergeTwoLists1 = function (a, b) {
    if (a === null) { return b }
    if (b === null) { return a }
    if (a.val < b.val) {
        a.next = mergeTwoLists(a.next, b);
        return a
    }
    b.next = mergeTwoLists(a, b.next);
    return b
};

// this was faster, beating 88%
var mergeTwoLists = function (a, b) {
    if (!a || !b) { return a || b }
    if (a.val < b.val) {
        a.next = mergeTwoLists(a.next, b);
        return a
    }
    b.next = mergeTwoLists(a, b.next);
    return b
};

// iterative was a little faster, beating 92% on speed and 94% on memory
var mergeTwoListsIterative = function (l1, l2) {
    let dummy = new ListNode(0);
    let cur = dummy;
    let a = l1, b = l2;
    while (a && b) {
        if (a.val < b.val) {
            cur.next = a;
            a = a.next;
        } else {
            cur.next = b;
            b = b.next
        }
        cur = cur.next
    }
    cur.next = a || b
    return dummy.next
};