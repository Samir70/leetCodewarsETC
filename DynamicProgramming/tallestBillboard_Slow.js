/**
 * @param {number[]} rods
 * @return {number}
 */
// TLEs but gets right answers
var tallestBillboard = function (rods) {
  let maxHeight = 0;
  let n = rods.length;
  limit = 2**n;
  // store bitmask of every selection with its sum as key
  let hashOfSums = {}
  for (let i = 0; i < limit; i++) {
    let sumA = 0;
    let bit = limit / 2
    for (let r of rods) {
      if (i & bit) {sumA += r} 
      // console.log({r, i, bit, sumA, condition: i&bit})
      bit >>= 1
    }
    if (hashOfSums[sumA] === undefined) {hashOfSums[sumA] = []}
    hashOfSums[sumA].push(i)
    // console.log({sumA, mask: i.toString(2)})
  }
  // console.log(hashOfSums)
  for (let [sum, masks] of Object.entries(hashOfSums)) {
    if (masks.length > 1) {
      for (let i = 0; i < masks.length; i++) {
        for (let j = i + 1; j < masks.length; j++) {
          // console.log({sum: Number(sum), masks: [masks[i], masks[j]], overlap:masks[i] & masks[j]})
          if ((masks[i] & masks[j]) === 0) {
            maxHeight = Math.max(maxHeight, Number(sum))
          }
        }
      }
    }
  }
  return maxHeight
};

const tests = [
  { args: [[1, 2, 3, 6]], out: 6 },
  { args: [[1, 2, 3, 4, 5, 6]], out: 10 },
  { args: [[1, 2]], out: 0 },
  { args: [[1, 2, 3, 4, 5, 6, 8, 12, 45, 13, 15, 12, 56, 67, 45, 23, 34, 35, 16, 100]], out: 251 },
];

tests.forEach((t, i) => {
  let res = tallestBillboard(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});