/**
 * @param {number} low
 * @param {number} high
 * @return {number[]}
 */
var sequentialDigits = function (low, high) {
  // const biggestSeq = [
  //   "123456789", "23456789", "3456789", "456789", "56789",
  //   "6789", "789", "89"
  // ];
  // const allSeq = new Set()
  // for (let num of biggestSeq) {
  //   for (let len = 2; len < 10; len++) {
  //     allSeq.add(num.slice(0, len))
  //   }
  // }
  // return [...allSeq].map(Number).sort((a, b) => a - b)
  const allSeqNums = [
    12, 23, 34, 45,
    56, 67, 78, 89,
    123, 234, 345, 456,
    567, 678, 789, 1234,
    2345, 3456, 4567, 5678,
    6789, 12345, 23456, 34567,
    45678, 56789, 123456, 234567,
    345678, 456789, 1234567, 2345678,
    3456789, 12345678, 23456789, 123456789
  ]
  return allSeqNums.filter(n => low <= n && n <= high)
};

const tests = [
  { args: [100, 300], out: [123, 234] },
  { args: [1000, 13000], out: [1234, 2345, 3456, 4567, 5678, 6789, 12345] },
  {
    args: [10, 1000000000], out: [
      12, 23, 34, 45, 56, 67, 78, 89, 123, 234, 345,
      456, 567, 678, 789, 1234, 2345, 3456, 4567, 5678,
      6789, 12345, 23456, 34567, 45678, 56789, 123456,
      234567, 345678, 456789, 1234567, 2345678, 3456789,
      12345678, 23456789, 123456789
    ]
  }
];

tests.forEach((t, i) => {
  let res = sequentialDigits(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});