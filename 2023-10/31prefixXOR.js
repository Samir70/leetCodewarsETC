/**
 * @param {number[]} pref
 * @return {number[]}
 */
const findArray = pref => {
  for (let i = pref.length - 1; i > 0; i--) {
    pref[i] ^= pref[i - 1]
  }
  return pref
}
// const findArray = pref => {
//   // beats 70% and 14%
//   let arr = [...pref]
//   for (let i = 1; i < pref.length; i++) {
//     arr[i] = pref[i - 1] ^ pref[i]
//   }
//   return arr
// }
// const findArray = pref => {
//   // beats 62% and 39% on time and memory
//   let out = [];
//   let cur = 0;
//   for (let n of pref) {
//     // console.log({ cur, target: n, needed: cur | n })
//     needed = cur ^ n
//     out.push(needed)
//     cur = n
//   }
//   return out
// }
// const toBitArray = n => {
//   let out = [...n.toString(2)].map(Number)
//   while (out.length < 20) {
//     out.unshift(0)
//   }
//   return out
// }
// // Beats about 6% on time and memory
// var findArray = function (pref) {
//   let out = [];
//   let curVal = 0;
//   let curBits = toBitArray(curVal);
//   for (let n of pref) {
//     let target = toBitArray(n)
//     let needed = Array(20).fill(0)
//     for (let i = target.length - 1; i >= 0; i--) {
//       if ((curBits[i] || 0) !== (target[i] || 0)) {
//         needed[i] = 1
//       }
//     }
//     let neededVal = parseInt(needed.join(""), 2);
//     // console.log({ curBits, target, needed, neededVal })
//     curVal ^= neededVal;
//     curBits = toBitArray(curVal)
//     out.push(neededVal)
//   }
//   return out
// };

const tests = [
  { args: [[5, 2, 0, 3, 1]], out: [5, 7, 2, 3, 2] },
  { args: [[13]], out: [13] },
  { args: [[5342, 245245, 134670, 32457, 432561]], out: [5342, 239907, 111603, 159943, 452472] },
  { args: [[135634, 45, 457346, 29999, 457, 437346]], out: [135634, 135679, 457391, 429997, 29926, 437675] },
];

tests.forEach((t, i) => {
  let res = findArray(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});