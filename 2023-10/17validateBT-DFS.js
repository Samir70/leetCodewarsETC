/**
 * @param {number} n
 * @param {number[]} leftChild
 * @param {number[]} rightChild
 * @return {boolean}
 */
var validateBinaryTreeNodes = function (n, leftChild, rightChild) {
  const findRoot = () => {
    let children = new Set([...leftChild, ...rightChild])
    for (let i = 0; i < n; i++) {
      if (!children.has(i)) { return i }
    }
    return -1
  }
  let root = findRoot();
  let stack = [root], seen = new Set([root])
  while (stack.length > 0) {
    let cur = stack.pop();
    let left = leftChild[cur], right = rightChild[cur];
    if (left > -1) {
      if (seen.has(left)) {return false}
      seen.add(left);
      stack.push(left)
    }
    if (right > -1) {
      if (seen.has(right)) {return false}
      seen.add(right);
      stack.push(right)
    }
  }
  return seen.size === n
};

const tests = [
  { args: [4, [1, -1, 3, -1], [2, -1, -1, -1]], out: true },
  { args: [4, [1, -1, 3, -1], [2, 3, -1, -1]], out: false },
  { args: [2, [1, 0], [-1, -1]], out: false },
  { args: [8, [1, -1, 3, -1, -1, -1, -1, -1], [2, -1, -1, -1, -1, -1, -1, -1]], out: false },
  { args: [8, [1, 4, 3, -1, 6, 7, -1, -1], [2, 5, -1, -1, -1, -1, -1, -1]], out: true },
  { args: [4, [3, -1, 1, -1], [-1, -1, 0, -1]], out: true },
  { args: [3, [2, 1, -1], [-1, -1, -1]], out: false },
  { args: [3, [1, 0, -1], [-1, -1, -1]], out: false },
  { args: [4, [1, -1, -1, -1], [2, -1, -1, -1]], out: false },
  { args: [4, [1, -1, 3, -1], [-1, -1, -1, 2]], out: false },
  { args: [3, [2, 0, -1], [-1, -1, -1]], out: true },
  { args: [3, [1, -1, -1], [-1, -1, 1]], out: false },
];

tests.forEach((t, i) => {
  let res = validateBinaryTreeNodes(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});