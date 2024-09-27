
var MyCalendarTwo = function () {
  this.appointments = [];
};

/** 
* @param {number} start 
* @param {number} end
* @return {boolean}
*/
MyCalendarTwo.prototype.book = function (start, end) {
  const overlap = this.appointments.filter(([as, ae]) => start < ae && end > as)
    .sort(([a], [b]) => a - b)
    .some(([start], i, arr) => i && start < arr[i - 1][1])

  if (overlap) return false;
  this.appointments.push([start, end]);
  return true;
};

/** 
* Your MyCalendarTwo object will be instantiated and called as such:
* var obj = new MyCalendarTwo()
* var param_1 = obj.book(start,end)
*/