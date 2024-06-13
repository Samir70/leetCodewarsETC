/**
 * @param {number[]} seats
 * @param {number[]} students
 * @return {number}
 */
var minMovesToSeat = function (seats, students) {
  seats.sort((a, b) => a - b)
  students.sort((a, b) => a - b)
  let moves = 0
  for (let i = 0; i < seats.length; i++) {
    moves += Math.abs(seats[i] - students[i])
  }
  return moves
};

const tests = [
  { args: [[3, 1, 5], [2, 7, 4]], out: 4 },
  { args: [[4, 1, 5, 9], [1, 3, 2, 6]], out: 7 },
  { args: [[2, 2, 6, 6], [1, 3, 2, 6]], out: 4 },
];

tests.forEach((t, i) => {
  let res = minMovesToSeat(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});