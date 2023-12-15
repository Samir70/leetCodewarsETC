/**
 * @param {string[][]} paths
 * @return {string}
 */
var destCity = function (paths) {
  const cities = new Set()
  for (let [a, b] of paths) {
    cities.add(a)
    cities.add(b)
  }
  for (let [a, b] of paths) {
    cities.delete(a)
  }
  return [...cities][0]
};

const tests = [
  { args: [[["London", "New York"], ["New York", "Lima"], ["Lima", "Sao Paulo"]]], out: "Sao Paulo" },
  { args: [[["B", "C"], ["D", "B"], ["C", "A"]]], out: "A" },
  { args: [[["A", "Z"]]], out: "Z" },
];

tests.forEach((t, i) => {
  let res = destCity(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});