/**
 * @param {number} n
 * @return {number}
 */
var totalMoney = function(n) {
  let fullWeeks = Math.floor(n/7);
  let w = 0, weekly = 28;
  let total = 0;
  while (w < fullWeeks) {
      total += weekly;
      weekly += 7;
      w++;
  }
  let rest = n % 7;
  let daily = fullWeeks + 1;
  let d = 0
  while (d < rest) {
      total += daily;
      daily++
      d++
  }
  return total
};