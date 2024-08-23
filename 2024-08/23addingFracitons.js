/**
 * @param {string} expression
 * @return {string}
 */
var fractionAddition = function (expression) {
  // if (expression[0] === "-") {
  //   expression = "0/1+" + expression
  // }
  let fractions = [], ops = []
  let i = 0, isNeg = expression[0] === "-"
  while (i < expression.length) {
    let frac = isNeg ? "-" : ""
    i += isNeg ? 1 : 0
    while (i < expression.length && expression[i] !== "+" && expression[i] !== "-") {
      frac += expression[i++]
    }
    fractions.push(toFrac(frac))
    ops.push(expression[i++])
    isNeg = expression[i] === "-"
  }
  let lcd = 1
  for (let [num, den] of fractions) {
    lcd = lcm(lcd, den)
  }
  let numerator = fractions[0][0] * (lcd / fractions[0][1])
  for (let i = 1; i < fractions.length; i++) {
    let [num, den] = fractions[i]
    if (ops[i - 1] === "-") { num *= -1 }
    numerator += num * (lcd / den)
  }
  // console.log({ fractions, ops, numerator, lcd })
  let d = gcd(Math.abs(numerator), lcd)
  return [numerator, lcd].map(n => n/d).join("/")
};
const toFrac = s => s.split("/").map(Number)
const gcd = (a, b) => {
  if (b === 0 || a === b) { return a }
  if (a === 0) { return b }
  return a > b ? gcd(a % b, b) : gcd(a, b % a)
}
const lcm = (a, b) => {
  let d = gcd(a, b)
  return (a / d) * b
}

const tests = [
  { args: ["-1/2+1/2"], out: "0/1" },
  { args: ["-1/2+1/2+1/3"], out: "1/3" },
  { args: ["1/3-1/2"], out: "-1/6" },
];

tests.forEach((t, i) => {
  let res = fractionAddition(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});