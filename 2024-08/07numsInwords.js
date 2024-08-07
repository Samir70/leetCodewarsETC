/**
 * @param {number} num
 * @return {string}
 */
const digits = "Zero One Two Three Four Five Six Seven Eight Nine".split(" ")
const teens = "Ten Eleven Twelve Thirteen Fourteen Fifteen Sixteen Seventeen Eighteen Nineteen".split(" ")
const tens = "null null Twenty Thirty Forty Fifty Sixty Seventy Eighty Ninety".split(" ")
var numberToWords = function (num) {
  if (num < 10) {
    return digits[num]
  } else if (num < 20) {
    return teens[num - 10]
  } else if (num < 100) {
    let units = num % 10
    let tensWord = Math.floor(num / 10)
    return units > 0 ? `${tens[tensWord]} ${digits[units]}` : tens[tensWord]
  } else if (num < 1000) {
    let huns = Math.floor(num / 100)
    let rest = num % 100
    return rest > 0 ? `${numberToWords(huns)} Hundred ${numberToWords(rest)}` :
      `${numberToWords(huns)} Hundred`
  } else if (num < 10 ** 6) {
    let thous = Math.floor(num / 1000)
    let rest = num % 1000
    return rest > 0 ? `${numberToWords(thous)} Thousand ${numberToWords(rest)}` :
      `${numberToWords(thous)} Thousand`
  } else if (num < 10 ** 9) {
    let mils = Math.floor(num / (10 ** 6))
    let rest = num % (10 ** 6)
    return rest > 0 ? `${numberToWords(mils)} Million ${numberToWords(rest)}` :
      `${numberToWords(mils)} Million`
  } else {
    let bils = Math.floor(num / (10 ** 9))
    let rest = num % (10 ** 9)
    return rest > 0 ? `${numberToWords(bils)} Billion ${numberToWords(rest)}` :
      `${numberToWords(bils)} Billion`
  }
};

const tests = [
  { args: [20], out: "Twenty" },
  { args: [23], out: "Twenty Three" },
  { args: [123], out: "One Hundred Twenty Three" },
  { args: [100], out: "One Hundred" },
  { args: [207], out: "Two Hundred Seven" },
  { args: [1000], out: "One Thousand" },
  { args: [10000], out: "Ten Thousand" },
  { args: [207087], out: "Two Hundred Seven Thousand Eighty Seven" },
  { args: [12345], out: "Twelve Thousand Three Hundred Forty Five" },
  { args: [10000000], out: "Ten Million" },
  { args: [1234567], out: "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven" },
  { args: [2000000000], out: "Two Billion" },
  { args: [2147483647], out: "Two Billion One Hundred Forty Seven Million Four Hundred Eighty Three Thousand Six Hundred Forty Seven" },
];

// for (let i = 0; i < 20; i++) {
//   console.log(numberToWords(i))
// }

tests.forEach((t, i) => {
  let res = numberToWords(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});