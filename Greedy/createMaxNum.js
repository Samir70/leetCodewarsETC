/*
create a k-digit number from two lists, but output should maintain relative order from input lists
*/
// works for k small enough that you don't place the last digit of both lists
var maxNumber = function(nums1, nums2, k) {
    let out = [];
    let used1 = -1, used2 = -1;
    // not sure how to use these
    let placed1 = Array(nums1.length);
    let placed2 = Array(nums2.length);
    while (used1 < nums1.length - 1 || used2 < nums2.length - 1) {
        let left = Math.max(...nums1.slice(used1+1), -Infinity);
        let right = Math.max(...nums2.slice(used2+1), -Infinity);
        if (left > right) {
            let i = used1+1
            used1 = nums1.indexOf(left);
            nums1[used1] *= -10;
            while (i < used1) {
                nums1[i] *= -1;
                i++
            }
            out.push(left)
        } else {
            let i = used2+1
            used2 = nums2.indexOf(right);
            nums2[used2] *= -10;
            while (i < used2) {
                nums2[i] *= -1;
                i++
            }
            out.push(right)
        }
        if (out.length === k) {return out}
        console.log(out, nums1, nums2)
    }
    return out
};

/*
From ihatevirus on leetcode
Step1: Create maximum numbers of every length individually from nums1 and nums2. 
(easier to work out max for numbers of length k..1)
Step2: Combine dp1[i] + dp2[k-i] to create maximum 'k' digit number
*/


const tests = [
  {nums1 : [3, 4, 6, 5], nums2: [9, 1, 2, 5, 8, 3], k: 5, out:[9, 8, 6, 5, 3]}, 
  {nums1 : [6, 7], nums2: [6, 0, 4], k : 5, out:[6, 7, 6, 0, 4]},
  {nums1 : [3, 9], nums2 : [8, 9], k : 3, out: [9, 8, 9]}
];

tests.forEach((t, i) => console.log(
  'test', i, maxNumber(t.nums1, t.nums2, t.k).join(''} === t.out.join('')
));
