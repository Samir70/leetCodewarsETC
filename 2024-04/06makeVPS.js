/**
 * @param {string} s
 * @return {string}
 */
var minRemoveToMakeValid = function (s) {
  let [count, out] = [0, []];
  for (let c of s) {
    switch (c) {
      case '(': { count++; break }
      case ')': { count--; break }
      default: { }
    }
    count >= 0 ? out.push(c) : count = 0;
  }
  count = 0;
  console.log(out.join(""));
  out.reverse()
  let out2 = [];
  for (let c of out) {
    switch (c) {
      case ')': { count++; break }
      case '(': { count--; break }
      default: { }
    }
    count >= 0 ? out2.push(c) : count = 0;
  }
  return out2.reverse().join("")
};

const tests = [
  { args: ["lee(t(c)o)de)"], out: "lee(t(c)o)de" },
  { args: ["lee((((t(c)o)de)"], out: "lee((t(c)o)de)" },
  { args: ["a)b(c)d"], out: "ab(c)d" },
  { args: ["))(("], out: "" },
  { args: ["()))(("], out: "()" },
];

tests.forEach((t, i) => {
  let res = minRemoveToMakeValid(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});