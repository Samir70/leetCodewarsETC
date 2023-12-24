/**
 * @param {string} s
 * @return {number}
 */
// var minOperations = function (s) {
//   const n = s.length
//   let posBest = "1"
//   while (posBest.length < n) {
//     let newDigit = posBest[0] === "1" ? "0" : "1"
//     posBest = newDigit + posBest
//   }
//   let posBest2 = posBest.slice(1) 
//   posBest2 += posBest[n - 1] === "1" ? "0" : "1"
//   let dif1 = 0, dif2 = 0
//   for (let i = 0; i < n; i++) {
//     if (s[i] !== posBest[i]) {dif1++}
//     if (s[i] !== posBest2[i]) {dif2++}
//   }
//   // console.log(posBest, posBest2)
//   return Math.min(dif1, dif2)
// };
var minOperations = function(s) {
  let ohOnes = 0, oneOhs = 0;
  for (let i = 0; i < s.length; i++) {
      if (i % 2) {
          // odd indexes, onOnes needs these to be ones
          s[i] === '1' ? oneOhs++ : ohOnes++
      } else {
          s[i] === '1' ? ohOnes++ : oneOhs++
      }
  }
  return Math.min(ohOnes, oneOhs)
};

const tests = [
  { args: ["0100"], out: 1 },
  { args: ["10"], out: 0 },
  { args: ["1111"], out: 2 },
];

tests.forEach((t, i) => {
  let res = minOperations(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});