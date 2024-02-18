class Heap {
  // minHeap by default, use -ve for maxHeap
  constructor() {
    this.size = 0;
    this.arr = [null];
  }

  peek() { return this.size > 0 ? this.arr[1] : null }

  bubbleUp(child) {
    if (child > 1) {
      var parent = Math.floor(child / 2);
      if (this.arr[child] < this.arr[parent]) {
        var temp = this.arr[child];
        this.arr[child] = this.arr[parent];
        this.arr[parent] = temp
        this.bubbleUp(parent)
      }
    }
  }

  add(n) {
    this.size++
    this.arr[this.size] = n
    this.bubbleUp(this.size)
  }

  bubbleDown(parent) {
    var child = [this.arr[parent], parent];
    var le = 2 * parent, r = 2 * parent + 1;
    var left = le > this.size ? Infinity : this.arr[le]
    if (left < child[0]) { child = [left, le] }
    var right = r > this.size ? Infinity : this.arr[r];
    if (right < child[0]) { child = [right, r] }
    if (child[1] > parent) {
      var temp = this.arr[parent];
      this.arr[parent] = child[0];
      this.arr[child[1]] = temp;
      this.bubbleDown(child[1])
    }
  }

  poll() {
    var out = this.arr[1];
    this.arr[1] = this.arr[this.size];
    this.arr.pop()
    this.size--
    this.bubbleDown(1);
    return out;
  }
}

/**
 * @param {number} n
 * @param {number[][]} meetings
 * @return {number}
 */
var mostBooked = function (n, meetings) {
  const makeHeapVal = (room, endTime) => (endTime * 1000) + room
  const getRoomEnd = (hVal) => [hVal % 1000, Math.floor(hVal / 1000)]
  let unusedRooms = new Heap(), finishTimes = new Heap()
  for (let r = 0; r < n; r++) {
    unusedRooms.add(r)
  }
  const meetingCount = Array(n).fill(0)
  const availableFrom = Array(n).fill(0)
  meetings.sort((a, b) => a[0] - b[0])
  // console.log(meetings)
  for (let [start, end] of meetings) {
    while (finishTimes.size > 0 && finishTimes.peek() < start * 1000 + 100) {
      let [r, e] = getRoomEnd(finishTimes.poll())
      unusedRooms.add(r)
      availableFrom[r] = e
    }
    if (unusedRooms.size === 0) {
      let [r, e] = getRoomEnd(finishTimes.poll())
      unusedRooms.add(r)
      availableFrom[r] = e
    }
    let room = unusedRooms.poll()
    let duration = end - start
    let actualStart = Math.max(availableFrom[room], start)
    meetingCount[room]++
    finishTimes.add(makeHeapVal(room, actualStart + duration))
    // console.log({ start, end, room, availableFrom: availableFrom[room] })
  }
  // console.log({ meetingCount })
  let max = 0, maxRoom = 0
  for (let r = 0; r < n; r++) {
    if (meetingCount[r] > max) {
      max = meetingCount[r]
      maxRoom = r
    }
  }
  return maxRoom
};


const { bigTest } = require("./18bigTest")
const tests = [
  { args: [2, [[0, 10], [1, 5], [2, 7], [3, 4]]], out: 0 },
  { args: [2, [[0, 10], [1, 5], [5, 7], [3, 4]]], out: 1 },
  { args: [3, [[1, 20], [2, 10], [3, 5], [4, 9], [6, 8]]], out: 1 },
  { args: [4, [[18, 19], [3, 12], [17, 19], [2, 13], [7, 10]]], out: 0 },
  { args: [4, [[48, 49], [22, 30], [13, 31], [31, 46], [37, 46], [32, 36], [25, 36], [49, 50], [24, 34], [6, 41]]], out: 0 },
  { args: [94, bigTest], out: 1}
];

tests.forEach((t, i) => {
  let res = mostBooked(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});