var countStudents = function (students, sandwiches) {
  let count = [0, 0];
  for (let s of students) { count[s]++ }
  for (let s of sandwiches) {
    if (count[s] === 0) {
      // can't serve this sandwich
      return count[(s + 1) % 2]
    }
    count[s]--
  }
  return 0
};

const tests = [
  { args: [[1, 1, 0, 0], [0, 1, 0, 1]], out: 0 },
  { args: [[1, 1, 1, 0, 0, 1], [1, 0, 0, 0, 1, 1]], out: 3 }
]

tests.forEach((t, i) => {
  let res = countStudents(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});