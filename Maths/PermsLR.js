/**
 * working in this base, it is still possible to multiply two numbers and get a result that is too high for JS. So here is a multMod function to handle numbers accurately.
 */

const base = 10 ** 9 + 7;
const multMod = (a, b) => {
  let out = 0;
  while (b > 0) {
    if (b % 2) { out = (out + a) % base }
    a = (a + a) % base;
    b = b >> 1
  }
  return out
}
const powerMod = (a, b) => {
  if (a === 1) { return 1 }
  if (b === 1) { return a }
  let out = 1;
  while (b > 0) {
    if (b % 2) { out = multMod(out, a) }
    a = multMod(a, a)
    b = b % 2 ? (b - 1) / 2 : b / 2
  }
  return out
}
const multInv = n => powerMod(n, base - 2)

/**
 * Given n lefts and m rights
 * How many possible ways are there to order the left/rights?
 * want
 * (n+m)! / n!m!
 */

const permsLR = (a, b) => {
  let m = Math.max(a, b);
  let n = Math.min(a, b);
  let top = m + n;
  let out = 1;
  m++;
  while (m <= top) {
    out = multMod(out, m); //(out * m) % mod;
    // console.log(`multiplied by ${m}, got ${out} mod ${mod}`)
    m++;
  }
  while (n > 1) {
    let inv = multInv(n);
    out = multMod(out, inv); //(out * inv) % mod
    // console.log(`divided by ${n}, so multiplied by ${inv} got ${out}. check, product is: ${(n * inv) % mod}`)
    n--
  }
  return out
}

const totalWays = nums => {
  if (nums.length <= 1) { return 1 }
  let lefts = nums.filter(n => n < nums[0]);
  let rights = nums.filter(n => n > nums[0]);
  let leftWays = totalWays(lefts);
  let rightWays = totalWays(rights);
  // console.log({lefts, rights, leftWays, rightWays, perms: permsLR(lefts.length, rights.length)})
  return multMod(multMod(leftWays, rightWays), permsLR(lefts.length, rights.length))
}

var numOfWays = function (nums) {
  return totalWays(nums) - 1
};

const tests = [
  { args: [3, 2], out: 10 },
  { args: [5, 2], out: 21 },
  { args: [5, 3], out: 56 },
  { args: [1, 1], out: 2 },
  { args: [10, 8], out: 11 * 13 * 17 * 18 },
  // 11, 132, 66, 22, 22*13, 22*13*14, 13*11*7 = 13*77, 13*77*15/5 = 13*77 * 3, 13*77*3*16/6*7 = 88, 13*11, 11*13*17*18
  // { args: [500, 497], out: 5 }
]

tests.forEach((t, i) => {
  let res = permsLR(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});

const numWaysTests = [
  { arg: [2, 1, 3], out: 1 },
  { arg: [3, 4, 5, 1, 2], out: 5 },
  { arg: [1, 2, 3], out: 0 },
  { arg: [11, 6, 3, 5, 4, 7, 2, 8, 1, 10, 9, 15, 12, 14, 13, 17, 18, 16], out: 588107519 },
  { arg: [9, 4, 2, 1, 3, 6, 5, 7, 8, 14, 11, 10, 12, 13, 16, 15, 17, 18], out: 216212978 },
  { arg: [44, 21, 25, 39, 42, 11, 40, 14, 16, 36, 26, 22, 34, 12, 32, 30, 29, 31, 20, 41, 3, 46, 9, 10, 18, 28, 17, 15, 27, 43, 6, 8, 38, 33, 1, 19, 4, 45, 37, 7, 24, 2, 23, 5, 13, 35], out: 211285431 }
]

numWaysTests.forEach((t, i) => {
  let res = numOfWays(t.arg);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});
