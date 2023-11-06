/**
 * @param {number} n
 */
var SeatManager = function(n) {
  this.seats = Array(n+1).fill(0)
  this.nextSeat = 1
  this.forEmptyStack = 1
  this.lim = n
  this.unreservedStack = new Set()
  // min heap would be more efficient
};

/**
* @return {number}
*/
SeatManager.prototype.reserve = function() {
  if (this.nextSeat > this.lim) {return 'Ooops! full.'}
  this.seats[this.nextSeat] = 1
  let out = this.nextSeat;
  // while (this.seats[this.nextSeat] && this.nextSeat <= this.lim) {this.nextSeat++}
  if (this.unreservedStack.size === 0) {
      this.forEmptyStack++
      this.nextSeat = this.forEmptyStack
  } else {
      this.unreservedStack.delete(this.nextSeat)
      this.nextSeat = this.unreservedStack.size === 0 ? this.forEmptyStack : Math.min(...this.unreservedStack)
  }
  return out
};

/** 
* @param {number} seatNumber
* @return {void}
*/
SeatManager.prototype.unreserve = function(seatNumber) {
  this.seats[seatNumber] = 0
  this.unreservedStack.add(seatNumber)
  if (this.nextSeat > seatNumber) {this.nextSeat = seatNumber}
};

/** 
* Your SeatManager object will be instantiated and called as such:
* var obj = new SeatManager(n)
* var param_1 = obj.reserve()
* obj.unreserve(seatNumber)
*/