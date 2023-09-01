/**
 * @param {number} num
 * @return {number[]}
 */
var countBits = function(n) {
  const arr = [0,1,1];
  var lastPower2 = 2;
  var extra = 0;
  while (lastPower2 + extra < n) {
      extra++;
      if (extra === lastPower2) {
          lastPower2 *= 2;
          extra = 0;
          arr.push(1)
      } else {
          arr.push(arr[lastPower2] + arr[extra])
      }
  }
  return arr.slice(0, n+1)
};

