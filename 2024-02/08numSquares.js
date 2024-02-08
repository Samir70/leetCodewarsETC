// 16+25 = 41 doesn't use the biggest square below 41
const numSquares = n => {
  if (n === 0) { return 0 }
  var rt = Math.floor(Math.sqrt(n))
  if (n === rt * rt) { return 1 }
  // answer can be 2, 3 or 4
  // check for 2
  while (rt * rt >= n / 2) {
    var leftOver = n - rt * rt;
    if (leftOver === Math.floor(Math.sqrt(leftOver)) ** 2) { return 2 }
    rt--
  }
  /**
   * Legendre’s Three-Square Theorem, 
   * which states that NumSquares(n) cannot be 1, 2, or 3 
   * if n can be expressed as n = 4^a * (8*b + 7)
   * Check if we need 4
   */
  var m = n;
  while (m % 4 === 0) { m /= 4 }
  if (m % 8 === 7) { return 4 }
  return 3
}

var tests = [
  { args: [41], out: 2 },
  { args: [16], out: 1 },
  { args: [32], out: 2 },
  { args: [8645581], out: 3 },
  { args: [1673342], out: 3 },
  { args: [5307031], out: 4 },
  { args: [855184], out: 3 },
  { args: [6090906], out: 3 },
  { args: [5512054], out: 3 },
  { args: [6799749], out: 3 },
  { args: [2223317], out: 2 },
  { args: [7609484], out: 3 },
  { args: [6288767], out: 4 },
]

tests.forEach((t, i) => {
  let res = numSquares(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});