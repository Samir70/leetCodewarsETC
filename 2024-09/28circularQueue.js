/**
 * @param {number} k
 */
var MyCircularDeque = function (k) {
  this.arr = Array(2000).fill(null)
  this.head = 1000
  this.tail = 1000
  this.maxSize = k
  this.size = 0
};

/** 
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertFront = function (value) {
  // console.log({ value, size: this.size, head: this.head, full: this.isFull() })
  if (this.isFull()) { return false }
  if (this.isEmpty()) {
    this.arr[this.head] = value
    this.size++
  } else {
    this.head--
    this.arr[this.head] = value
    this.size++
  }
  return true
};

/** 
 * @param {number} value
 * @return {boolean}
*/
MyCircularDeque.prototype.insertLast = function (value) {
  if (this.isFull()) { return false }
  if (this.isEmpty()) {
    this.arr[this.tail] = value
    this.size++
  } else {
    this.tail++
    this.arr[this.tail] = value
    this.size++
  }
  return true
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteFront = function () {
  if (this.size === 0) { return false }
  if (this.size > 1) { this.head++ }
  this.size--
  return true
};

/**
 * @return {boolean}
*/
MyCircularDeque.prototype.deleteLast = function () {
  if (this.size === 0) { return false }
  if (this.size > 1) { this.tail-- }
  this.size--
  return true
};

/**
 * @return {number}
 */
MyCircularDeque.prototype.getFront = function () {
  return this.size > 0 ? this.arr[this.head] : -1
};

/**
 * @return {number}
*/
MyCircularDeque.prototype.getRear = function () {
  return this.size > 0 ? this.arr[this.tail] : -1
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.isEmpty = function () {
  return this.size === 0
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.isFull = function () {
  // console.log("isFull", { size: this.size, max: this.maxSize })
  return this.size === this.maxSize
};

MyCircularDeque.prototype.print = function () {
  console.log({
    size: this.size, max: this.maxSize,
    head: this.head, tail: this.tail,
    hv: this.arr[this.head], tv: this.arr[this.tail]
  })
};

// const commands = ["MyCircularDeque", "insertLast", "insertLast", "insertFront", "insertFront", "getRear", "isFull", "deleteLast", "insertFront", "getFront"]
// const args = [[3], [1], [2], [3], [4], [], [], [], [4], []]
// const outs = [null, true, true, true, false, 2, true, true, true, 4]

const commands = ["MyCircularDeque", "insertFront", "insertLast", "deleteFront", "getFront", "deleteLast", "insertLast", "isEmpty", "deleteLast", "insertFront", "getRear", "deleteFront", "insertFront", "insertLast", "deleteLast", "getFront", "getRear", "insertFront", "getRear", "getFront"]
const args = [[999], [93], [578], [], [], [], [533], [], [], [913], [], [], [100], [57], [], [], [], [900], [], []]
const outs = [null, true, true, true, 578, true, true, false, true, true, 913, true, true, true, true, 100, 100, true, 100, 900]

let circDeQ = new MyCircularDeque(args[0][0])
commands.forEach((cmd, i) => {
  if (i === 0) { return }
  let res = circDeQ[cmd](...args[i]);
  // circDeQ.print()
  if (res !== outs[i]) {
    console.log(
      'test', i, `${cmd}(${args[i].join(", ")})`, 'should be', outs[i], ' got ', res
    )
  } else {
    console.log('test', i, `${cmd}(${args[i].join(", ")})`, 'was correct!')
  }
});