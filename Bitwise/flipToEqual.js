var minFlips = function (a, b, c) {
  let flips = 0;
  while (a + b + c > 0) {
    // compare least significant bits
    let [x, y, z] = [a%2, b%2, c%2]
    if (z === 1) {
      if (x === 0 && y === 0) {
        flips++
      }
    } else {
      flips += x + y
    }
    a >>= 1; b >>= 1; c >>= 1;
  }
  return flips
};

const tests = [
  { a: 2, b: 6, c: 5, out: 3 },
  { a: 4, b: 2, c: 7, out: 1 },
  { a: 1, b: 2, c: 3, out: 0 }
];

tests.forEach((t, i) => {
  let res = minFlips(t.a, t.b, t.c);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});