// lists have numbers starting from least sig digit
// to 764 is 4 -> 6 -> 7 -> null

var addTwoNumbers = function (a, b) {
    let sum = new ListNode();
    let cur = sum;
    let carry = 0;
    while (a || b || carry === 1) {
        let v = a === null ? 0 : a.val;
        let w = b === null ? 0 : b.val;
        let total = v + w + carry;
        carry = total > 9 ? 1 : 0;
        let s = new ListNode(total % 10, null)
        cur.next = s;
        cur = cur.next;
        a = a === null ? a : a.next;
        b = b === null ? b : b.next;
    }
    return sum.next
};

// includes lists of different lengths in the tests

