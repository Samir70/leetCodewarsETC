const testQ1 = [
  [], // G
  [], // 1
  [5, 5, 5], // 2
  [], // 3
  [], // 4
  [], // 5
  [], // 6
];

const result1 = [0, 2, 5, 0];

const testQ2 = [
  [], // G
  [], // 1
  [1, 1], // 2
  [], // 3
  [], // 4
  [], // 5
  [], // 6
];

const result2 = [0, 2, 1, 0]

const testQ3 = [
  [], // G
  [3], // 1
  [4], // 2
  [], // 3
  [5], // 4
  [], // 5
  [], // 6
];

const result3 = [0, 1, 2, 3, 4, 5, 0];


const testQ4 = [
  [], // G
  [0], // 1
  [], // 2
  [], // 3
  [2], // 4
  [3], // 5
  [], // 6
];
const result4 = [0, 5, 4, 3, 2, 1, 0];

const testQ5 = [ [ 3 ], [ 2 ], [ 0 ], [ 2 ], [], [], [ 5 ] ]

module.exports = { testQ1, testQ2, testQ3, testQ4, testQ5 }