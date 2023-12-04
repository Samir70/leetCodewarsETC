/**
 * @param {string} num
 * @return {string}
 */
var largestGoodInteger = function (num) {
  let triples = (num.match(/(\d)\1\1/g) || []).sort()
  return triples[triples.length - 1] || ""
};

const tests = [
  { args: ["6777133339"], out: "777" },
  { args: ["2300019"], out: "000" },
  { args: ["42352338"], out: "" },
];

tests.forEach((t, i) => {
  let res = largestGoodInteger(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});