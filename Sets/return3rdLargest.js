// only consider distinct values
// if fewer than 3 then return max
// else return third largest

var thirdMax = function (nums) {
  const numsSet = new Set(nums);
  if (numsSet.size < 3) {
    return Math.max(...numsSet);
  } else {
    numsSet.delete(Math.max(...numsSet));
    numsSet.delete(Math.max(...numsSet));
    return Math.max(...numsSet);
  }
};

const tests = [
  { arr: [5, -4, -5, -5, 0, -1, 3, 1, -1, -4, 9, 3, 6, 3, -3, -9, -4, -9, 5, -4], output: 5 },
  { arr: [5, 5, 0, 6, 7, 1, 6, 1, 8, 4, -1, 1, 8, 7, -5, -5, -10, -5, 8, 1], output: 6 },
  { arr: [-2, 4, 9, -8, 3, -2, 3, -4, 0, 8, -6, 8, -8, 6, -2, 1, 8, 4, 3, -5], output: 6 },
  { arr: [1, -9, 8, 5, 0, -8, -10, 9, 7, 9, 7, -9, -2, -4, 3, 7, 5, -4, -7, -3], output: 7 },
  { arr: [1, 2, 2], output: 2 }
];

tests.forEach(t => console.log(thirdMax(t.arr) === t.output))