/**
 * @param {number[][]} edges
 * @return {number}
 */
var findCenter = function(edges) {
  let [a, b] = edges[0]
  return edges[1].includes(a) ? a : b
};