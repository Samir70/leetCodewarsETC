// beats 88%
// Can be done with a single pointer though
var summaryRanges = function(nums) {
    if (nums.length === 0) {return []}
    if (nums.length === 1) {return [''+nums[0]]}
    let left = 0, right=0;
    let out = []
    while (left < nums.length) {
        let c = nums[right]
        while (nums[right+1] === c+1) {
            right++;
            c++                
        }
        out.push(right === left ? ''+c : nums[left]+'->'+nums[right]);
        right++; 
        left = right
    }
    return out
};

const tests = [
  {in:[0,1,2,4,5,7], out: ["0->2","4->5","7"]},
  {in: [0,2,3,4,6,8,9], out: ["0","2->4","6","8->9"]},
  {in: [], out:[]},
  {in:[1], out:["1"]}
];

tests.forEach((t, i) => console.log(
  'test', i, summaryRanges(t.in), 'should be', t.out
))
