/**
 * @param {string[]} bank
 * @return {number}
 */
var numberOfBeams = function (bank) {
  const count1s = str => [...str].filter(d => d === "1").length
  let count = 0;
  const sensors = bank.map(count1s)
  // console.log(sensors)
  let prev = sensors[0];
  for (let i = 1; i < sensors.length; i++) {
    let cur = sensors[i]
    if (cur > 0) {
      count += prev * cur;
      prev = cur
    }
  }
  return count
};

// let rndTestCase = []
// for (let c = 0; c < 5; c++) {
//   let row = ""
//   for (let r = 0; r < 20; r++) {
//     row += Math.random() < 0.95 ? "0" : 1
//   }
//   rndTestCase.push(row + row + row)
// }
// console.log(rndTestCase)

const tests = [
  { args: [["011001", "000000", "010100", "001000"]], out: 8 },
  { args: [["000", "111", "000"]], out: 0 },
  {
    args: [[
      "000010010001000000000000100100010000000000001001000100000000",
      "000000000000000000000000000000000000000000000000000000000000",
      "001010000000000000000010100000000000000000101000000000000000",
      "000000000000000000000000000000000000000000000000000000000000",
      "000000000000000000000000000000000000000000000000000000000000",
      "000001000000000000000000010000000000000000000100000000000000",
      "000000000000000000000000000000000000000000000000000000000000",
      "000000000000000000000000000000000000000000000000000000000000",
      "000000000000000000000000000000000000000000000000000000000000",
      "000000000000000000000000000000000000000000000000000000000000",
      "000000000000010010000000000000000100100000000000000001001000"
    ]], out: 90
  },
];

tests.forEach((t, i) => {
  let res = numberOfBeams(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});