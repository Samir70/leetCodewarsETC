/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSubarray = function(nums) {
  /*
  want to convert 
  [1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1]
  into
  [3, false, 2, true, 4]
  because the 3 cannot be added to the 2 -- there are two zeros between
  but the 2 can be added to the 4 just by deleting one zero
  */
  
  var oneCount = 0, zeroCount = 0;
  var tally = []
  for (var i = 0; i<nums.length; i++) {
      if (nums[i] === 1) {
          if (zeroCount === 1) { tally.push(true) }
          if (zeroCount > 1) {tally.push(false)}
          oneCount++
          zeroCount = 0;
      } else {
          if (oneCount > 0) {tally.push(oneCount)}
          oneCount = 0;
          zeroCount++
      }
  }
  if (oneCount > 0) {tally.push(oneCount)}
  if (zeroCount > 0) {tally.push(false)}
  console.log(tally)
  if (tally.length === 1) {
      if (typeof tally[0] === 'boolean') {return 0}
      return tally[0] - 1 
  }
  var maxFound = 0;
  i = 0;
  while (i < tally.length) {
      while (typeof tally[i] === 'boolean') {i++}
      var local = tally[i];
      if (tally[i-1] === true && i > 1) {local += tally[i-2]}
      if (local > maxFound) {maxFound = local}
      i++
  }
  return maxFound
};