function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}
var MyCalendar = function () {
  this.events = null
};

/** 
* @param {number} start 
* @param {number} end
* @return {boolean}
*/
MyCalendar.prototype.book = function (start, end) {
  if (this.events === null) {
    this.events = new TreeNode([start, end])
    return true
  }
  let cur = this.events
  while (cur) {
    let [a, b] = cur.val
    if (end > a && end <= b) { return false }
    if (start >= a && start < b) { return false }
    if (start < a && end > a) { return false }
    if (end <= cur.val[0]) {
      if (cur.left === null) {
        cur.left = new TreeNode([start, end])
        return true
      }
      cur = cur.left
    } else {
      if (cur.right === null) {
        cur.right = new TreeNode([start, end])
        return true
      }
      cur = cur.right
    }
  }
};

/** 
* Your MyCalendar object will be instantiated and called as such:
* var obj = new MyCalendar()
* var param_1 = obj.book(start,end)
*/