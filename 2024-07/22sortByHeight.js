/**
 * @param {string[]} names
 * @param {number[]} heights
 * @return {string[]}
 */
var sortPeople = function (names, heights) {
  return names.map((n, i) => [n, heights[i]])
    .sort((a, b) => b[1] - a[1])
    .map(n => n[0])
};

const tests = [
  { args: [["Mary", "John", "Emma"], [180, 165, 170]], out: ["Mary", "Emma", "John"] },
  { args: [["Alice", "Bob", "Bob"], [155, 185, 150]], out: ["Bob", "Alice", "Bob"] },
];

tests.forEach((t, i) => {
  let res = sortPeople(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});