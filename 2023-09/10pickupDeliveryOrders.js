/**
 * Placing and being valid are two different things. 
 * For each placement, it has a corresponding placement where 
 * pick up and delivery is swapped. 
 * Hence for each pair of placement only 1 is valid, 
 * aka when pick up < delivery. 
 * Hence it's (2i-1) * 2i / 2 = (2i - 1) * i
 * valid choices for pickup followed by delivery
 */
const base = 10 ** 9 + 7
const multMod = (a, b) => {
  let out = 0;
  while (b > 0) {
    if (b % 2) { out = (out + a) % base }
    a = (a + a) % base;
    b = b >> 1
  }
  return out
}
/**
 * @param {number} n
 * @return {number}
 */
var countOrders = function (n) {
  let ways = 1;
  for (let i = 2; i <= n; i++) {
    let actionsInPrevLevel = 2 * (i - 1)
    let slotsForThisLevel = actionsInPrevLevel + 1
    ways = multMod(ways, slotsForThisLevel);
    ways = multMod(ways, i)
  }
  return ways;
};

const tests = [
  { args: [1], out: 1 },
  { args: [2], out: 6 },
  { args: [3], out: 90 },
  { args: [5], out: 113400 },
  { args: [7], out: 681080400 },
  { args: [10], out: 850728840 },
  { args: [500], out: 764678010 },
];

tests.forEach((t, i) => {
  let res = countOrders(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});