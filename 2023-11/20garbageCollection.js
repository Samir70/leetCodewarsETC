/**
 * @param {string[]} garbage
 * @param {number[]} travel
 * @return {number}
 */
var garbageCollection = function (garbage, travel) {
  for (let i = 1; i < travel.length; i++) {
    travel[i] += travel[i - 1]
  }
  // console.log(travel)
  let [doneM, doneP, doneG] = [false, false, false]
  let ans = 0;
  for (let i = garbage.length - 1; i >= 0; i--) {
    let toCollect = garbage[i];
    ans += toCollect.length;
    if (doneP && doneG && doneM) { continue }
    for (let mpg of toCollect) {
      if (!doneM && mpg === "M") {
        ans += travel[i - 1] || 0
        doneM = true
      }
      if (!doneP && mpg === "P") {
        ans += travel[i - 1] || 0
        doneP = true
      }
      if (!doneG && mpg === "G") {
        ans += travel[i - 1] || 0
        doneG = true
      }
      // console.log({ i, ans, toCollect, mpg })
    }
  }
  return ans
};
// var garbageCollection = function (garbage, travel) {
//   let tally = { "M": 0, "P": 0, "G": 0 }
//   let lastHouse = { "M": 0, "P": 0, "G": 0 }
//   let timeList = [0], time = 0;
//   for (let i = 0; i < garbage.length; i++) {
//     let g = garbage[i]
//     time += (travel[i] || 0)
//     timeList.push(time)
//     for (let mpg of g) {
//       tally[mpg]++
//       lastHouse[mpg] = i
//     }
//   }
//   // console.log({ tally, lastHouse, timeList })
//   let ans = 0;
//   [..."MPG"].forEach(mpg => {
//     ans += tally[mpg] + timeList[lastHouse[mpg]]
//   });
//   return ans
// };

const tests = [
  { args: [["G", "P", "GP", "GG"], [2, 4, 3]], out: 21 },
  { args: [["MMM", "PGM", "GP"], [3, 10]], out: 37 },
];

tests.forEach((t, i) => {
  let res = garbageCollection(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});