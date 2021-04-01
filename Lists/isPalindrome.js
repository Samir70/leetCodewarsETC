// with loads of extra memory!
var isPalindrome1 = function(head) {
    let arr = [];
    let cur = head;
    while (cur) {
        arr.push(cur.val);
        cur = cur.next
    }
    let right = arr.length - 1, left = 0;
    while (left < right) {
        if (arr[left] !== arr[right]) {return false}
        left++; right--;
    }
    return true
};

// O(1) space
const findMid = listHead => {
    let a = listHead, b = listHead;
    while (b && b.next) {
        a = a.next;
        b = b.next.next
    }
    return a
}

const reverse = listHead => {
    let prev = null, next = null, cur = listHead;
    while (cur) {
        let nxt = cur.next;
        cur.next = prev;
        prev = cur;
        cur = nxt
    }
    return prev
}

const isPalindrome = head => {
    let front = head, back = reverse(findMid(head))
    while (front && back) {
        if (front.val !== back.val) {return false}
        front = front.next; 
        back = back.next;
    }
    return true
}