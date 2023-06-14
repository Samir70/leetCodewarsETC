var getMinimumDifference = function(root) {
  let prevVal = null;
  let minDiff = Infinity;
  let stack = [];
  let cur = root
  while (cur || stack.length) {
      while (cur) {
          stack.push(cur);
          cur = cur.left;
      }
      cur = stack.pop();
      if (prevVal !== null) {
          let diff = cur.val - prevVal
          minDiff = Math.min(minDiff, diff)
      }
      prevVal = cur.val
      cur = cur.right
  }
  return minDiff
};