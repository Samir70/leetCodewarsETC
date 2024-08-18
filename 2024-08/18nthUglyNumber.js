// Ugly numbers are positive numbers whose prime factors only include 
// (include nothing other than) 2, 3, 5. 
// 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 is the sequence of the first 10 ugly numbers.
// reminded me of quick way to make klarner-Rado sequence

var nthUglyNumber = function (n) {
  var uglyList = [1];
  // pointers
  var [p2, p3, p5] = [0, 0, 0];
  /**
   * make new uglies from old by times by 2, 3 or 5
   * keep track of uglies that are made by each method
   * push lowest into uglyList
   */
  var [from2, from3, from5] = [2, 3, 5];
  while (uglyList.length < n) {
    var lastUgly = uglyList[uglyList.length - 1];
    while (from2 <= lastUgly) {
      p2++;
      from2 = uglyList[p2] * 2
    }
    while (from3 <= lastUgly) {
      p3++;
      from3 = uglyList[p3] * 3
    }
    while (from5 <= lastUgly) {
      p5++;
      from5 = uglyList[p5] * 5
    }
    var nextUgly = Math.min(from2, from3, from5)
    uglyList.push(nextUgly)
    // console.log({ uglyList, nextUgly, candidates: [from2, from3, from5] })
  }
  return uglyList[n - 1]
};

const tests = [
  { args: [10], out: 12 },
  { args: [1], out: 1 },
  { args: [1690], out: 2123366400 }
];

tests.forEach((t, i) => {
  let res = nthUglyNumber(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});

/**
 * more compact code, ran faster
 * var nthUglyNumber = function(n) {
    if (!n || n == 0) return 0;
    if (n == 1) return 1;
    
    let p2 = 0,
        p3 = 0,
        p5 = 0,
        dp = [1],
        curr = 0;

    while (curr < n) {
        let ugly = Math.min(2 * dp[p2], 3 * dp[p3], 5 * dp[p5]);
        dp.push(ugly);

        if (ugly == 2 * dp[p2]) p2++;
        if (ugly == 3 * dp[p3]) p3++;
        if (ugly == 5 * dp[p5]) p5++;
        curr++;
    }
    return dp[n - 1];
};
 */