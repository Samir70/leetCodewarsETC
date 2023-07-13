/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (v, edges) {
  if (edges.length < 2) { return true }
  var noIns = new Set([...Array(v)].map((x, i) => x = i))
  var inOutCount = {}
  for (var e of edges) {
    if (inOutCount[e[0]] === undefined) {
      inOutCount[e[0]] = { in: new Set(), out: new Set() }
    }
    if (inOutCount[e[1]] === undefined) {
      inOutCount[e[1]] = { in: new Set(), out: new Set() }
    }
    inOutCount[e[0]].out.add(e[1])
    inOutCount[e[1]].in.add(e[0])
    noIns.delete(e[1])
  }
  var stack = Array.from(noIns);
  var edgeCount = edges.length;
  var order = [];
  // console.log(inOutCount, stack);
  while (stack.length > 0) {
    var vert = stack.pop();
    order.push(vert)
    if (inOutCount[vert] !== undefined) {
      for (var dest of inOutCount[vert].out) {
        inOutCount[dest].in.delete(vert)
        if (inOutCount[dest].in.size === 0) { stack.push(dest) }
        edgeCount--
      }
    }
  }
  // console.log(order)
  return edgeCount > 0 ? false : true
};