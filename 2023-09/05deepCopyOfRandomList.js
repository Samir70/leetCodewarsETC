const listVals = head => {
    let cur = head;
    while (cur) {
        console.log(cur.val, cur.next && cur.next.val, cur.random && cur.random.val);
        cur = cur.next;
    }
}
/**
 * Initialization and Interweaving:
        Traverse the original list.
        For each node, create a corresponding new node and place it between the current node and the current node's next.

 * Setting Random Pointers:
        Traverse the interweaved list.
        For each old node, set its corresponding new node's random pointer.

 * Separating Lists:
        Traverse the interweaved list again to separate the old and new lists.

 */
var copyRandomList = function(head) {
    let cur = head;
    let newHead = cur ? new Node(cur.val, null, null) : null;
    let newCur = newHead;
    while (cur && cur.next) {
        let newNode = new Node(cur.next.val);
        newCur.next = cur.next;
        cur.next = newCur;
        cur = newCur.next;
        newCur = newNode;
    }
    if (cur) {cur.next = newCur};
    cur = head; newCur = newHead;
    // listVals(head);
    while (cur && cur.next) {
        newCur.random = cur.random ? cur.random.next : null;
        cur = cur.next.next;       
        newCur = newCur.next ? newCur.next.next : null;
    }
    // listVals(head)
    cur = head; newCur = newHead;
    while (cur && cur.next) {
        cur.next = cur.next.next;
        newCur.next = newCur.next ? newCur.next.next : null;
        cur = cur.next; newCur = newCur.next
    }
    // listVals(head)
    return newHead
};

// https://leetcode.com/problems/copy-list-with-random-pointer/