/**
 * @param {string} n
 * @return {string}
 */
const mirror = s => [...s].reverse().join("")
const makePal = (n, left) => {
  let right = mirror(left)
  return n % 2 ? left + right.slice(1) : left + right
}
var nearestPalindromic = function (num) {
  let n = num.length
  if (n === 1) { return `${Number(num) - 1}` }
  let pals = []
  let mid = Math.ceil(n / 2)
  let left = num.slice(0, mid)
  pals.push(makePal(n, left))
  let decLeft = `${Number(left) - 1}`
  pals.push(makePal(n, decLeft))
  let incLeft = `${Number(left) + 1}`
  pals.push(makePal(n, incLeft))
  let nines = Array(n - 1).fill(9).join("")
  pals.push(nines)
  let oneZerosOne = `1${Array(n - 1).fill(0).join("")}1`
  pals.push(oneZerosOne)
  // console.log({ num, left, pals })
  let ans = "", bigNum = BigInt(num)
  let minDiff = BigInt("99999999999999999999999999999999999")
  for (let pal of pals) {
    if (pal === num) { continue }
    let bigIntPal = BigInt(pal)
    let diff = bigIntPal - bigNum
    if (diff < 0) { diff *= -1n }
    if (diff < minDiff) {
      minDiff = diff
      ans = pal
    } else if (diff === minDiff) {
      if (BigInt(ans) > bigIntPal) { ans = pal }
    }
  }
  return ans
};

const tests = [
  { args: ["123"], out: "121" },
  { args: ["121"], out: "111" },
  { args: ["11"], out: "9" },
  { args: ["28"], out: "33" },
  { args: ["27"], out: "22" },
  { args: ["1"], out: "0" },
  { args: ["101"], out: "99" },
  { args: ["999999999999999999"], out: "1000000000000000001" },
  { args: ["1000000000000000"], out: "999999999999999" },
  { args: ["1837722381"], out: "1837667381" },
  { args: ["1805170081"], out: "1805115081" },
  { args: ["11011"], out: "11111" },
  { args: ["807045053224792883"], out: "807045053350540708" },
];

tests.forEach((t, i) => {
  let res = nearestPalindromic(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, `(${t.args[0]})`, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});