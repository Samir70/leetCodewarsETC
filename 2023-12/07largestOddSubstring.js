/**
 * @param {string} num
 * @return {string}
 */
var largestOddNumber = function(num) {
    let i = num.length -1
    while (i >= 0 && Number(num[i]) % 2 === 0) {
      i--
    }
    return num.slice(0, i+1)
};

const tests = [
  {args: ["52"], out: "5"},
  {args: ["4206"], out: ""},
  {args: ["35427"], out: "35427"},
];

tests.forEach((t, i) => {
  let res = largestOddNumber(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});