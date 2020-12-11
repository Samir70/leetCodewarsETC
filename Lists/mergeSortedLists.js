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
const mergeTwoLists = (a, b) => {
    let dummy = new ListNode(0);
    let cur = dummy;
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

// merge an array of lists, slower but beats nearly 96% on memory
// another option was to merge lists two at a time. Fast for some submissions, but sometimes slower than this.
var mergeKLists = function(lists) {
    let dummy = new ListNode(0);
    let cur = dummy;
    lists = lists.filter(x => x !== null)
    while (lists.length > 1) {
        let indOfMin = 0;
        for (let i = 1; i<lists.length; i++) {
            if (lists[i].val < lists[indOfMin].val) {
                indOfMin = i
            }
        }
        cur.next = lists[indOfMin];
        lists[indOfMin] = lists[indOfMin].next;
        if (lists[indOfMin] === null) {
            lists.splice(indOfMin, 1)
        }
        cur = cur.next
    }
    cur.next = lists[0] || null
    return dummy.next
};

// Above builds one long list that it adds everything to
// better to pair them up and build more even length lists
// beats 82%
var mergeKLists = function(lists) {
    while (lists.length > 1) {
        let left = 0, right = lists.length - 1;
        while (left < right) {
            let merged = mergeTwoLists(lists[left], lists[right]);
            lists.pop();
            lists[left] = merged;
            left++; right--;
        }
    }
    return lists[0] || null
};

// also tried using a heap, but it wasn't as fast as above: