/*
create a k-digit number from two lists, but output should maintain relative order from input lists
*/

var maxNumber = function(nums1, nums2, k) {
    
};


const tests = [
  {nums1 : [3, 4, 6, 5], nums2: [9, 1, 2, 5, 8, 3], k: 5, out:[9, 8, 6, 5, 3]}, 
  {nums1 : [6, 7], nums2: [6, 0, 4], k : 5, out:[6, 7, 6, 0, 4]},
  {nums1 : [3, 9], nums2 : [8, 9], k : 3, out: [9, 8, 9]}
];

tests.forEach((t, i) => console.log(
  'test', i, maxNumber(t.nums1, t.nums2, t.k).join(''} === t.out.join('')
));
