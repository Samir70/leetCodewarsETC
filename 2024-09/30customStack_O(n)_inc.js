/**
 * @param {number} maxSize
 */
var CustomStack = function (maxSize) {
  this.maxSize = maxSize
  this.arr = []
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
  // console.log({ arr: this.arr, len: this.arr.length, max: this.maxSize })
  return this.arr.length > 0 ? this.arr.pop() : -1
};

/** 
 * @param {number} k 
 * @param {number} val
 * @return {void}
 */
CustomStack.prototype.increment = function (k, val) {
  let last = Math.min(this.arr.length, k)
  for (let i = 0; i < last; i++) {
    this.arr[i] += val
  }
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
