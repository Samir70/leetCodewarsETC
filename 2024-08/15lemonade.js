/**
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function (bills) {
  let [fives, tens] = [0, 0]
  for (let bill of bills) {
    // console.log({ bill, fives, tens })
    if (bill === 5) {
      fives++
    } else if (bill === 10) {
      if (fives === 0) { return false }
      fives--
      tens++
    } else {
      // bill === 20
      if (fives < 1) { return false }
      if (tens > 0) {
        tens--
        fives--
      } else if (fives >= 3) {
        fives -= 3
      } else {
        return false
      }
    }
  }
  return true
};

const tests = [
  { args: [[5, 5, 5, 10, 20]], out: true },
  { args: [[5, 5, 10, 10, 20]], out: false },
];

tests.forEach((t, i) => {
  let res = lemonadeChange(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});