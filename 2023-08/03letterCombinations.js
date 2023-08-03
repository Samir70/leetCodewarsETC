/**
 * @param {string} digits
 * @return {string[]}
 */
const digitMap = {
  "2": "abc".split(""),
  "3": "def".split(""),
  "4": "ghi".split(""),
  "5": "jkl".split(""),
  "6": "mno".split(""),
  "7": "pqrs".split(""),
  "8": "tuv".split(""),
  "9": "wxyz".split(""),
}
var letterCombinations = function (digits) {
  if (digits === "") { return [] }
  if (digits.length === 1) { return digitMap[digits] }
  let firstLetters = digitMap[digits[0]]
  let otherLetters = letterCombinations(digits.slice(1))
  let out = []
  for (let letter of firstLetters) {
    for (let suffix of otherLetters) {
      out.push(letter + suffix)
    }
  }
  return out
};

const tests = [
  { args: ["23"], out: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"] },
  { args: [""], out: [] },
  { args: ["2"], out: ["a", "b", "c"] },
  { args: ["2376"], out: ["adpm","adpn","adpo","adqm","adqn","adqo","adrm","adrn","adro","adsm","adsn","adso","aepm","aepn","aepo","aeqm","aeqn","aeqo","aerm","aern","aero","aesm","aesn","aeso","afpm","afpn","afpo","afqm","afqn","afqo","afrm","afrn","afro","afsm","afsn","afso","bdpm","bdpn","bdpo","bdqm","bdqn","bdqo","bdrm","bdrn","bdro","bdsm","bdsn","bdso","bepm","bepn","bepo","beqm","beqn","beqo","berm","bern","bero","besm","besn","beso","bfpm","bfpn","bfpo","bfqm","bfqn","bfqo","bfrm","bfrn","bfro","bfsm","bfsn","bfso","cdpm","cdpn","cdpo","cdqm","cdqn","cdqo","cdrm","cdrn","cdro","cdsm","cdsn","cdso","cepm","cepn","cepo","ceqm","ceqn","ceqo","cerm","cern","cero","cesm","cesn","ceso","cfpm","cfpn","cfpo","cfqm","cfqn","cfqo","cfrm","cfrn","cfro","cfsm","cfsn","cfso"]}
];

tests.forEach((t, i) => {
  let res = letterCombinations(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});