const {listify, unlist} = require('./listify');

var removeElements = function (head, val) {
    if (head === null) { return null }
    head.next = removeElements(head.next, val)
    return head.val === val ? head.next : head
};

// only beat 5%, slower than recursion
var removeElements2 = (head, val) => {
    var dummy = new ListNode('haha', head);
    var current = dummy;
    while (current && current.next !== null) {
        if (current.next.val === val) {
            current.next = current.next.next
        } else {
            current = current.next
        }
    }
    return dummy.next
}



// console.log(listify([6, 5, 4]));

const tests = [
    { list: [1, 2, 6, 3, 4, 5, 6], val: 6, out: [1, 2, 3, 4, 5] },
    { list: [6, 1, 2, 6, 3, 4, 5, 6], val: 6, out: [1, 2, 3, 4, 5] },
    { list: [1, 1, 1], val: 1, out: [] }
];

tests.forEach((t, i) => console.log(
    'test', i, unlist(removeElements2(listify(t.list), t.val)), 'should be', t.out
))