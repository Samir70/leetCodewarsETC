/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var decodeAtIndex = function (s, k) {
  let lenDecoded = 0n
  for (let cur of s) {
    if (Number(cur) > 0) {
      lenDecoded *= BigInt(Number(cur))
    } else {
      lenDecoded += 1n
    }
  }
  // console.log({ lenDecodedString: lenDecoded })
  let posWanted = BigInt(k)
  for (let i = s.length - 1; i >= 0; i--) {
    let cur = s[i]
    if (Number(cur) > 0) {
      lenDecoded /= BigInt(Number(cur))
      posWanted %= lenDecoded
    } else {
      if (posWanted === 0n || posWanted === lenDecoded) {
        return cur
      }
      lenDecoded -= 1n
    }
  }
  return 'X'
};
// too much memory
// var decodeAtIndex = function (s, k) {
//   let tape = ''
//   for (let cur of s) {
//     if (tape.length >= k) { return tape[k - 1] }
//     if (Number(cur) > 0) {
//       tape = Array(Number(cur)).fill(tape).join("")
//     } else {
//       tape += cur
//     }
//     // console.log({ cur, tape })
//   }
//   return tape[k - 1]
// };

const tests = [
  { args: ["leet2code3", 10], out: "o" },
  { args: ["ha22", 5], out: "h" },
  { args: ["a2345678999999999999999", 1], out: "a" },
  { args: ["ha22g8dsfhgk47dfjgh4skjdgh2dsfjghdkjfhg3", 5555], out: "h" },
  { args: ["y959q969u3hb22odq595", 222280369], out: "y" },
];

tests.forEach((t, i) => {
  let res = decodeAtIndex(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});