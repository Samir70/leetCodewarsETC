const { listify, unlist } = require('../Lists/listify');

var reorderList = function (head) {
    if (head === null || head.next === null) { return head }
    // split the list in two
    let slow = head, fast = head;
    while (fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    let secondHalf = slow.next;
    slow.next = null;
    // console.log(unlist(head), unlist(secondHalf))

    // reverse the second list
    let prev = null, cur = secondHalf;
    while (cur.next) {
        let nextItem = cur.next;
        cur.next = prev;
        prev = cur;
        cur = nextItem;
    }
    cur.next = prev;
    // console.log('second half reversed:', unlist(cur))

    // merge lists, list a should be the longer list
    const mergeLists = (a, b) => {
        if (a === null || b === null) { return }
        mergeLists(a.next, b.next)
        b.next = a.next;
        a.next = b;
    }
    mergeLists(head, cur)
};

const tests = [
    { in: [], out: [] },
    { in: [1], out: [1] },
    { in: [1, 2], out: [1, 2] },
    { in: [1, 2, 3, 4, 5], out: [1, 5, 2, 4, 3] },
    { in: [1, 2, 3, 4, 5, 6], out: [1, 6, 2, 5, 3, 4] },
    { in: [1, 2, 3, 4, 5, 6, 7, 8, 9], out: [1, 9, 2, 8, 3, 7, 4, 6, 5] },
    { in: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], out: [1, 10, 2, 9, 3, 8, 4, 7, 5, 6] }
];

tests.forEach(t => {
    let list = listify(t.in);
    reorderList(list);
    console.log(unlist(list), 'should be', t.out)
})