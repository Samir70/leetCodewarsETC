/**
 * in an array, two numbers appear once. 
 * The rest appear twice
 */

var singleNumber3 = function (nums) {
  var tally = {}
  for (var n of nums) {
    if (tally[n] === undefined) {
      tally[n] = 0
    }
    tally[n]++
  }
  var out = []
  for (var t in tally) {
    if (tally[t] === 1) { out.push(t) }
  }
  return out
};

/**
 * One important point is that by XORing all the numbers, we actually get the XOR of the two 
 * target numbers (because XORing two duplicate numbers always results in 0). 
 * Consider the XOR result of the two target numbers; 
 * if some bit of the XOR result is 1, it means that the two target numbers differ at that location.

Let’s say the at the ith bit, the two desired numbers differ from each other. 
which means one number has bit i equaling: 0, the other number has bit i equaling 1.

Thus, all the numbers can be partitioned into two groups according to their bits at location i.
the first group consists of all numbers whose bits at i is 0.
the second group consists of all numbers whose bits at i is 1.

Notice that, if a duplicate number has bit i as 0, then, 
two copies of it will belong to the first group. 
Similarly, if a duplicate number has bit i as 1, then, 
two copies of it will belong to the second group.

by XoRing all numbers in the first group, we can get the first number.
by XoRing all numbers in the second group, we can get the second number.

nb: x & (~x + 1) isolates rightmost bit
 */

var singleNumber = nums => {
  var xor = nums.reduce((a, v) => a ^ v, 0);
  var rightmost = xor & (~xor + 1);
  var a = nums.filter(x => x & rightmost).reduce((a, v) => a ^ v, 0)
  var b = nums.filter(x => !x & rightmost).reduce((a, v) => a ^ v, 0)
  return [a, b]
}
// NB only need the first set since b = xor^a 

// I thought this would be faster but it was slower:
// var singleNumber = function(nums) {
//     let xorOfAll = nums.reduce((a, c) => a^c, 0);
//     let rightmost = xorOfAll & (~xorOfAll + 1);
//     let firstNum = 0;
//     for (let n of nums) {
//         if (n & rightmost) { firstNum = firstNum ^ n}
//     }
//     return [firstNum, xorOfAll^firstNum]
// };

const tests = [
  { args: [[1, 2, 1, 3, 2, 5]], out: [3, 5] },
  { args: [[-1, 0]], out: [-1, 0] },
  { args: [[0, 1]], out: [0, 1] },
]

tests.forEach((t, i) => {
  let res = singleNumber(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});