/**
 * One pass:
 * var removeNthFromEnd = function(head, n) {
    let cursor = head;
    let editor = head;
    let counter = n;
    while (cursor) {
        //console.log(`currently visiting: ${cursor.val}`)
        cursor = cursor.next;
        counter--;
        if (counter < -1)
            editor = editor.next;
    }
    if (counter > -1)
        head = head.next;
    
    //console.log(editor.val)
    editor.next = editor.next && editor.next.next;
    
    return head;
};
 */

// two pass:
var removeNthFromEnd = function(head, n) {
    let len = 0;
    let cur = head;
    while (cur) {
        cur = cur.next;
        len++
    }
    let target = len - n;
    if (target === 0) {return head.next}
    let i = 0;
    cur = head;
    while (i < target - 1) {cur = cur.next; i++}
    cur.next = cur.next.next
    return head
};