// 88ms beat 91%
// https://leetcode.com/problems/reverse-nodes-in-k-group/
var reverseKGroup = function(head, k) {
    if (k === 1) {return head}
    let dummy = new ListNode(0, head);
    let lastSection = dummy;
    let i = 0; cur = dummy;
    while (cur) {
        while (i < k && cur.next) { cur = cur.next; i++ }
        if (i < k) {return dummy.next}
        let prev = lastSection, nextSection = cur.next;
        let n = lastSection.next;
        while (i > 0) {
            // console.log('start of switch', JSON.stringify(dummy))
            // console.log('processing', prev.val, n.val, nextSection && nextSection.val)
            let next = n.next
            if (prev === lastSection) {
                n.next = nextSection;
                cur = n
            } else {
                n.next = prev
            }
            prev = n
            n = next
            i--
            // console.log('end of switch', JSON.stringify(dummy))
        }
        // console.log('switching complete, connect', lastSection.val, 'to', prev.val)
        lastSection.next = prev; lastSection = cur; cur = nextSection; i = 1
        // console.log(JSON.stringify(dummy))
    }
    return dummy.next
};