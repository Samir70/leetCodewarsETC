/*
Given a sorted array where every element appears exactly twice, except one element that appears once
-- return that singeleton
https://leetcode.com/problems/single-element-in-a-sorted-array/ 
*/

// 48ms; beats 100%
var singleNonDuplicate = function(nums) {
    var i =0; 
    while (i<nums.length) {
        if (nums[i] === nums[i+1]) {
            i += 2
        } else {
            return nums[i]
        }
    }
    return null
};

// could use bitwise ^ but that was slow too

//72ms; beats 80%
// more of a quick search than binary

var singleNonDuplicate = function(nums) {
    const rndInt = Math.floor(Math.random() * nums.length)
    const border = nums[rndInt];
    let left = [], right = [];
    for (let n of nums) {
        if (n <= border) {
            left.push(n)
        } else {
            right.push(n)
        }
    }
    if (left.length === 1) {return left[0]}
    if (right.length === 1) {return right[0]}
    return left.length % 2 === 1 ? singleNonDuplicate(left) : singleNonDuplicate(right)
};

const tests = [
  {in:[1,1,2,3,3,4,4,8,8], out:2},
  {in:[3,3,7,7,10,11,11], out:10}
]

tests.forEach((t, i) => console.log(
  'test', i, singleNonDuplicate(t.in) === t.out
))
