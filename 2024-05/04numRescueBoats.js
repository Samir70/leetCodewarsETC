/**
 * @param {number[]} people
 * @param {number} limit
 * @return {number}
 */
// beat 100% on time
var numRescueBoats = function (people, limit) {
  let tally = Array(limit + 1).fill(0)
  for (let p of people) { tally[p]++ }
  let [left, right] = [1, limit]
  let count = 0
  while (left < right) {
    if (left + right <= limit) {
      let boats = Math.min(tally[left], tally[right])
      count += boats
      tally[left] -= boats
      tally[right] -= boats
      tally[left] === 0 ? left++ : right--
    } else {
      count += tally[right--]
    }
  }
  if (left === right) {
    let boats = tally[left]
    if (left + right <= limit) {
      count += boats % 2 ? (boats + 1) / 2 : boats / 2
    } else {
      count += boats
    }
  }
  return count
};
// var numRescueBoats = function (people, limit) {
//   people.sort((a, b) => a - b)
//   let [left, right] = [0, people.length - 1]
//   let count = 0
//   while (left <= right) {
//     if (people[right] + people[left] <= limit) {
//       left++
//     }
//     count++
//     right--
//   }
//   return count
// };

const tests = [
  { args: [[1, 2], 3], out: 1 },
  { args: [[3, 2, 2, 1], 3], out: 3 },
  { args: [[3, 2, 2, 1], 4], out: 2 },
  {
    args: [[
      5, 5, 5, 1, 1, 1,
      3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1,
      3, 3, 2, 2,
      3, 3, 3], 6], out: 13
  },
  { args: [[3, 5, 3, 4], 5], out: 4 },
];

tests.forEach((t, i) => {
  let res = numRescueBoats(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});