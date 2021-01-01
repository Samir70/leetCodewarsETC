var nextGreaterElement = function(nums1, nums2) {
    let hash = new Map();
    let stack = [];
    let i = 0;
    while (i < nums2.length) {
        if (stack.length === 0) {
            stack.push(nums2[i]);
            i++;
            continue;
        }
        let cur = stack.pop();
        if (cur > nums2[i]) {
            stack.push(cur, nums2[i]);
            i++;
        } else {
            hash.set(cur, nums2[i])
        }
    }
    return nums1.map(n => hash.has(n) ? hash.get(n) : -1)
};

const nextGreaterElement = (nums1, nums2) => {
    let stack = [];
    let hash = new Map();
    for (let n of nums2) {
        while (stack.length && stack[stack.length - 1] < n) {
            hash.set(stack.pop(), n)
        }
        stack.push(n)
    }
    return nums1.map(n => hash.has(n) ? hash.get(n) : -1)
}
