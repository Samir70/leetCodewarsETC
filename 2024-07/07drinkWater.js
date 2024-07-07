/**
 * @param {number} numBottles
 * @param {number} numExchange
 * @return {number}
 */
var numWaterBottles = function (numBottles, numExchange) {
  return numBottles + Math.floor((numBottles - 1) / (numExchange - 1))
};
// var numWaterBottles = function (numBottles, numExchange) {
//   let drink = numBottles
//   let empties = numBottles
//   while (empties >= numExchange) {
//     let canExchange = Math.floor(empties / numExchange)
//     empties -= canExchange * numExchange
//     drink += canExchange
//     empties += canExchange
//     // console.log({ empties, drink })
//   }
//   return drink
// };

const tests = [
  { args: [9, 3], out: 13 },
  { args: [15, 4], out: 19 },
  { args: [99, 13], out: 107 },
  { args: [99, 2], out: 197 },
];

tests.forEach((t, i) => {
  let res = numWaterBottles(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});