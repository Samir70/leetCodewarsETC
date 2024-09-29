class Node {
  constructor(freq, keys) {
    this.freq = freq;
    this.keys = keys;
    this.next = null;
    this.prev = null;
  }
}

var AllOne = function () {
  this.head = new Node(0, new Set())
  this.tail = new Node(Infinity, new Set())
  this.head.next = this.tail
  this.tail.prev = this.head
  this.validKeys = {}
};

/** 
 * @param {string} key
 * @return {void}
 */
AllOne.prototype.inc = function (key) {
  if (this.validKeys[key]) {
    let node = this.validKeys[key]
    node.keys.delete(key)
    let newFreq = node.freq + 1
    if (node.keys.size === 0) {
      node.prev.next = node.next
      node.next.prev = node.prev
      node = node.prev
    }
    // console.log("just checked if node losts its keys")
    // console.log(this.head)
    if (node.next.freq !== newFreq) {
      let newNode = new Node(newFreq, new Set())
      newNode.keys.add(key)
      node.next.prev = newNode
      newNode.next = node.next
      newNode.prev = node
      node.next = newNode
      this.validKeys[key] = newNode
    } else {
      node.next.keys.add(key)
      this.validKeys[key] = node.next
    }
  } else {
    let node
    if (this.head.next.freq === 1) {
      node = this.head.next
    } else {
      node = new Node(1, new Set())
      node.prev = this.head
      node.next = this.head.next
      this.head.next.prev = node
      this.head.next = node
    }
    this.validKeys[key] = node
    node.keys.add(key)
    // console.log("Just added a new string")
    // console.log(this.head)
  }
  return null
};

/** 
 * @param {string} key
 * @return {void}
*/
AllOne.prototype.dec = function (key) {
  let node = this.validKeys[key]
  node.keys.delete(key)
  let newFreq = node.freq - 1
  // console.log({ key, size: node.keys.size, freq:node.freq })
  if (node.keys.size === 0) {
    node.prev.next = node.next
    node.next.prev = node.prev
    node = node.next
  }
  if (newFreq === 0) {
    delete this.validKeys[key]
    return null
  }
  // console.log("just checked if node losts its keys")
  // console.log(this.head)
  if (node.prev.freq !== newFreq) {
    let newNode = new Node(newFreq, new Set())
    newNode.keys.add(key)
    node.prev.next = newNode
    newNode.prev = node.prev
    newNode.next = node
    node.prev = newNode
    this.validKeys[key] = newNode
  } else {
    node.prev.keys.add(key)
    this.validKeys[key] = node.prev
  }
  return null
};

/**
 * @return {string}
 */
AllOne.prototype.getMaxKey = function () {
  // console.log(this.head)
  if (this.tail.prev.freq === 0) {
    return ""
  }
  let [first] = this.tail.prev.keys
  return first
};

/**
 * @return {string}
 */
AllOne.prototype.getMinKey = function () {
  if (this.head.next.freq === Infinity) { return "" }
  let [first] = this.head.next.keys
  return first
};

const tests = [
  [
    ["AllOne", "inc", "inc", "getMaxKey", "getMinKey", "inc", "getMaxKey", "getMinKey", "dec", "getMinKey"],
    [[], ["hello"], ["hello"], [], [], ["leet"], [], [], ["leet"], []],
    [null, null, null, "hello", "hello", null, "hello", "leet", null, "hello"],
  ],
  [
    ["AllOne", "inc", "inc", "inc", "inc", "inc", "inc", "getMaxKey", "getMinKey", "inc", "getMaxKey", "getMinKey", "inc", "dec", "dec", "getMaxKey", "getMinKey"],
    [[], ["a"], ["b"], ["c"], ["d"], ["a"], ["d"], [], [], ["c"], [], [], ["b"], ["d"], ["d"], [], []],
    [null, null, null, null, null, null, null, "a", "b", null, "a", "b", null, null, null, "a", "a"],
  ],
  [
    ["AllOne", "inc", "inc", "inc", "inc", "inc", "dec", "dec", "getMaxKey", "getMinKey"],
    [[], ["a"], ["b"], ["b"], ["b"], ["b"], ["b"], ["b"], [], []],
    [null, null, null, null, null, null, null, null, "b", "a"],
  ],
  [
    ["AllOne", "inc", "inc", "inc", "inc", "inc", "inc", "dec", "dec", "getMinKey", "dec", "getMaxKey", "getMinKey"],
    [[], ["a"], ["b"], ["b"], ["c"], ["c"], ["c"], ["b"], ["b"], [], ["a"], [], []],
    [null, null, null, null, null, null, null, null, null, "a", null, "c", "c"]
  ]
]

for (let test of tests) {
  [commands, args, outs] = test
  let allOne = new AllOne()
  commands.forEach((cmd, i) => {
    if (i === 0) { return }
    let res = allOne[cmd](...args[i]);
    // allOne.print()
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
