/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function (str) {
  let i = 0
  while (str[i] === " ") { i++ }
  let isNeg = false
  if (str[i] === "-") {
    i++; isNeg = true
  } else if (str[i] === "+") {
    i++
  }
  while (str[i] === "0") { i++ }
  let out = 0n
  const maxInt = BigInt(2 ** 31) - 1n
  const minInt = BigInt(2 ** 31) * -1n
  // console.log({ maxInt, minInt })
  while (i < str.length) {
    if (isNaN(str[i])) { break }
    if (Number(str[i]) === 0 && str[i] !== "0") { break }
    let val = Number(str[i])
    out = (out * 10n) + BigInt(val)
    if (!isNeg && out > maxInt) { return Number(maxInt) }
    if (isNeg && out * -1n < minInt) { return Number(minInt) }
    // console.log({ i, val, out })
    i++
  }
  return isNeg ? Number(out * -1n) : Number(out)
};

const tests = [
  { args: ["42"], out: 42 },
  { args: ["   -042"], out: -42 },
  { args: ["1337c0d3"], out: 1337 },
  { args: ["0-1"], out: 0 },
  { args: ["+1"], out: 1 },
  { args: ["-+12"], out: 0 },
  { args: ["4193 with words"], out: 4193 },
  { args: ["words and 987"], out: 0 },
  { args: ["2147483647abc!"], out: 2147483647 },
  { args: ["42493670467304986730498670934867"], out: 2147483647 },
  { args: ["   -2147483648"], out: -2147483648 },
  { args: ["   -042834756092834670934856"], out: -2147483648 },
];

tests.forEach((t, i) => {
  // if (i !== 4) { return }
  let res = myAtoi(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});