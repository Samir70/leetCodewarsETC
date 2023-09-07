// beats 97% (23% mem)
var reverseBetween = function (head, left, right) {
  if (left === right) { return head }
  let dummy = new ListNode(0, head);
  let cur = dummy, staySame = null; i = 0;
  while (i < left) {
    i++;
    staySame = cur;
    cur = cur.next;
  }
  let firstChange = cur;
  let prev = null;
  while (i <= right) {
    let next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next
    i++
  }

  staySame.next = prev;
  firstChange.next = cur;

  return dummy.next;
};