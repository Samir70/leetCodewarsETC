/**
 * @param {string} s
 * @return {string}
 */
var maximumOddBinaryNumber = function (s) {
  let digits = [...s]
  const swap = (i, j) => {
    let t = digits[i]
    digits[i] = digits[j]
    digits[j] = t
    // console.log({i, j, digits})
  }
  let left = 0, right = s.length - 1
  while (left < right) {
    digits[left] === "1" ? left++ : swap(left, right--)
  }
  return [...digits.slice(1), digits[0]].join("")
};
// var maximumOddBinaryNumber = function (s) {
//   let tally = { "0": 0, "1": 0 }
//   for (let digit of s) {
//     tally[digit]++
//   }
//   return Array(tally["1"] - 1).fill("1").join("") + Array(tally["0"]).fill("0").join("") + "1"
// };

const tests = [
  { args: ["010"], out: "001" },
  { args: ["0101"], out: "1001" },
];

tests.forEach((t, i) => {
  let res = maximumOddBinaryNumber(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});