/**
 * @param {number} n
 * @param {number[]} leftChild
 * @param {number[]} rightChild
 * @return {boolean}
 */
var validateBinaryTreeNodes = function (n, leftChild, rightChild) {
  let componentLog = [...Array(n).keys()].map((x, i) => i);
  let hasParent = Array(n).fill(false);
  const findComponent = node => componentLog[node] === node ? node : findComponent(componentLog[node])
  const union = (a, b) => {
    let [compA, compB] = [findComponent(a), findComponent(b)];
    // console.log({compA, compB})
    if (compA !== compB) {
      if (compA > compB) {
        componentLog[compA] = compB;
      } else {
        componentLog[compB] = compA;
      }
      return true
    } else {
      // console.log(`${[a, b]} already in same component`)
      return false
    }
  }
  for (let i = 0; i < n; i++) {
    if (leftChild[i] !== -1) {
      if (hasParent[leftChild[i]]) { return false }
      hasParent[leftChild[i]] = true;
      let outcome = union(i, leftChild[i]);
      if (!outcome) { return false }
    }
    if (rightChild[i] !== -1) {
      if (hasParent[rightChild[i]]) { return false }
      hasParent[rightChild[i]] = true;
      let outcome = union(i, rightChild[i]);
      if (!outcome) { return false }
    }
    // console.log({ i, componentLog })
  }
  // console.log(componentLog)
  return componentLog.every(c => findComponent(c) === componentLog[0])
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