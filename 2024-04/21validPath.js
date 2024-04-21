/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} source
 * @param {number} destination
 * @return {boolean}
 */
var validPath = function (n, edges, source, destination) {
  let components = Array(n).fill(false)
  const getComponent = (v) => {
    if (components[v] === v || components[v] === false) { return v }
    return getComponent(components[v])
  }
  for (let [a, b] of edges) {
    if (components[a] === false && components[b] === false) {
      components[a] = a;
      components[b] = a;
    } else if (components[a] === false && components[b] !== false) {
      components[a] = components[b]
    } else if (components[a] !== false && components[b] === false) {
      components[b] = components[a]
    } else {
      let oldB = getComponent(b)
      let compA = getComponent(a)
      components[b] = compA
      components[oldB] = compA
    }
    // console.log({a, b, components})
  }
  return getComponent(source) === getComponent(destination)
};

const tests = [
  { args: [3, [[0, 1], [1, 2], [2, 0]], 0, 2], out: true },
  { args: [6, [[0, 1], [0, 2], [3, 5], [5, 4], [4, 3]], 0, 5], out: false },
  { args: [6, [[0, 1], [0, 2], [3, 5], [5, 4], [4, 1]], 0, 5], out: true },
  { args: [6, [[0, 1], [0, 2], [3, 5], [5, 4], [4, 1]], 2, 5], out: true },
];

tests.forEach((t, i) => {
  let res = validPath(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});