/**
 * @param {number[]} cookies
 * @param {number} k
 * @return {number}
 */
var distributeCookies = function (cookies, k) {
  let memo = {}
  let calls = 0
  const helper = (cookies, k) => {
    calls++
    if (cookies.length === k) { return Math.max(...cookies) }
    if (memo[cookies.join(",")] !== undefined) {
      return memo[cookies.join(",")]
    }
    let possAns = []
    for (let i = 0; i < cookies.length - 1; i++) {
      for (let j = i + 1; j < cookies.length; j++) {
        let newCookies = [...cookies]
        newCookies.splice(j, 1)
        newCookies[i] += cookies[j]
        // console.log({ i, j, newCookies })
        possAns.push(helper(newCookies, k))
      }
    }
    // console.log({ cookies, k, possAns, calls })
    memo[cookies.join(",")] = Math.min(...possAns)
    return memo[cookies.join(",")]
  }
  return helper(cookies, k)
};

const tests = [
  { args: [[8, 15, 10, 20, 8], 2], out: 31 },
  { args: [[6, 1, 3, 2, 2, 4, 1, 2], 3], out: 7 },
  { args: [[6, 1, 3, 2, 2, 4, 1, 2], 8], out: 6 },
  { args: [[65,51,33,32,72,48,41,52], 2], out: 197 },
];

tests.forEach((t, i) => {
  // if (i !== 0) { return }
  let res = distributeCookies(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});