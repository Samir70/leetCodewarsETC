var MyCalendar = function() {
    this.intervals = []
};

/** 
 * @param {number} start 
 * @param {number} end
 * @return {boolean}
 */
MyCalendar.prototype.book = function(start, end) {
    if (this.intervals.length === 0) {this.intervals.push([start, end]); return true}
    // binsary search to find where to put new interval.
    let left = 0, right = this.intervals.length - 1, len = this.intervals.length - 1;
    while (left < right) {
        let mid = Math.floor((left + right) / 2)
        if (this.intervals[mid][0] < start) {
            left = mid + 1
        } else {
            right = mid
        }
    }
    // right may never have shifted and new interval goes at end
    if (this.intervals[left][0] < start) {left++}
    // console.log(this.intervals, "considering:", [start, end])
    if (left === this.intervals.length) {
        // new interval is pushed onto intervals unless it overlaps the last interval
        if (this.intervals[len][1] > start) {
            return false
        } else {
            // console.log("push or extend?", this.intervals[len], [start, end])
            // if (this.intervals[len][1] === start) {
            //     this.intervals[len][1] === end;
            //     console.log("extend to become", this.intervals[len])
            // for some reason this doesn't actually change this.intervals
            // } else {
                this.intervals.push([start, end])
            // }
            return true
        }
    }
    if (end > this.intervals[left][0]) {
        return false
    }
    if (left > 0 && (this.intervals[left-1][1] > start)) {
        return false
    }
    this.intervals.splice(left, 0, [start, end])
    return true
};

/** 
 * Your MyCalendar object will be instantiated and called as such:
 * var obj = new MyCalendar()
 * var param_1 = obj.book(start,end)
 */

const tests = [
  {
    actions: ["MyCalendar","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book","book"],
    data: [[],[40,49],[40,49],[49,50],[49,50],[27,34],[23,30],[39,46],[8,15],[3,9],[2,8],[48,50],[46,50],[4,12],[4,10],[30,36],[47,50],[15,23],[43,50],[49,50],[24,33],[17,26],[3,11],[45,50],[3,8],[32,40],[37,43],[5,13],[0,9],[48,50],[14,22]],
    out: [null,true,false,true,false,true,false,false,true,false,true,false,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false]
  },
  {
    actions:["MyCalendar","book","book","book", "book", "book"], 
    data: [[],[10,16],[15,25],[20,30], [17, 21], [17, 18]],
    out: [null,true,false,true,false,true]
  }
]
