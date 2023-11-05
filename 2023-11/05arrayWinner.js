/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var getWinner = function(arr, k) {
    let winner = arr[0], streak = 0, i = 1;
    while (streak < k && i < arr.length) {
      if (arr[i] > winner) {
        streak = 1;
        winner = arr[i]
      } else {
        streak++
      }
      i++
    }
    return winner
};

const tests = [
  {args: [[2,1,3,5,4,6,7],   2], out: 5},
  {args: [[3,2,1],  10], out: 3},
];

tests.forEach((t, i) => {
  let res = getWinner(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});