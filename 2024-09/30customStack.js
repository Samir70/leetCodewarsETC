/**
 * @param {number} maxSize
 */
var CustomStack = function (maxSize) {
  this.maxSize = maxSize
  this.arr = []
  this.incArray = Array(maxSize).fill(0)
};

/** 
 * @param {number} x
 * @return {void}
 */
CustomStack.prototype.push = function (x) {
  if (this.arr.length < this.maxSize) {
    this.arr.push(x)
  }
  return null
};

/**
 * @return {number}
 */
CustomStack.prototype.pop = function () {
  if (this.arr.length === 0) { return -1 }
  let i = this.arr.length - 1
  let val = this.arr.pop() + this.incArray[i]
  if (i > 0) { this.incArray[i - 1] += this.incArray[i] }
  this.incArray[i] = 0
  return val
};

/** 
 * @param {number} k 
 * @param {number} val
 * @return {void}
 */
CustomStack.prototype.increment = function (k, val) {
  let last = Math.min(this.arr.length, k) - 1
  this.incArray[last] += val
  return null
};

const tests = [
  [
    ["CustomStack", "push", "push", "pop", "push", "push", "push", "increment", "increment", "pop", "pop", "pop", "pop"],
    [[3], [1], [2], [], [2], [3], [4], [5, 100], [2, 100], [], [], [], []],
    [null, null, null, 2, null, null, null, null, null, 103, 202, 201, -1],
  ]
]

for (let test of tests) {
  [commands, args, outs] = test
  let myStack = new CustomStack(args[0][0])
  commands.forEach((cmd, i) => {
    if (i === 0) { return }
    let res = myStack[cmd](...args[i]);
    // myStack.print()
    if (res !== outs[i]) {
      console.log(
        'test', i, `${cmd}(${args[i].join(", ")})`, 'should be', outs[i], ' got ', res
      )
    } else {
      console.log('test', i, `${cmd}(${args[i].join(", ")})`, 'was correct!')
    }
  });
  console.log("#############################")
}
