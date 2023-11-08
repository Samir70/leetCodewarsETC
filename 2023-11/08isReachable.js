/**
 * @param {number} sx
 * @param {number} sy
 * @param {number} fx
 * @param {number} fy
 * @param {number} t
 * @return {boolean}
 */
var isReachableAtTime = function(sx, sy, fx, fy, t) {
  if (sx === fx && sy === fy) {return t === 1 ? false : true}
  return t >= Math.max(Math.abs(sx - fx), Math.abs(sy - fy))
};