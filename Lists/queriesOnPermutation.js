// check Fenwick Tree approach
// https://leetcode.com/problems/queries-on-a-permutation-with-key/discuss/575019/Python-Fenwick-tree-O(n-log-n)

// my answer was with a linked list:
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}
var processQueries = function(queries, m) {
    let head = new ListNode(0, null)
    let cur = head;
    for (let i = 1; i <= m; i++) {
        cur.next = new ListNode(i, null)
        cur = cur.next
    }
    
    let out = []
    for (let q of queries) {
        let cur = head, prev = null;
        let i = -1;
        while (cur.val !== q) {
            i++;
            prev = cur;
            cur = cur.next
        }
        prev.next = cur.next
        cur.next = head.next
        head.next = cur
        out.push(i)
    }
    return out
};
