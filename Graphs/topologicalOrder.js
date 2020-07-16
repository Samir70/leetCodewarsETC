// https://www.interviewcake.com/concept/java/topological-sort

/**
 * hash the edges into an object where every vertex has a list of those that lead into it 
 * and where it leads out to
 * Push every vertex iwth no ins onto the stack
 * note the number of edges
 * while the stack is not empty:
 * - pop curr
 * - push curr onto ordered list
 * - for every vertex it points to: 
 * -- remove curr from destination's inlist
 * -- if this empties a destination's inlist, add it to the stack
 * -- decrement the count of edges
 * When stack is empty:
 * - if edgecount is now 0, return ordered list; else false
 */

const topOrder = (v, edges) => {
    if (edges.length<2) {return true}
    var noIns = new Set([...Array(v)].map((x, i) => x = i))
    var inOutCount = {}
    for (var e of edges) {
        if (inOutCount[e[0]] === undefined) {
            inOutCount[e[0]] = {in:new Set(), out:new Set()}
        } 
        if (inOutCount[e[1]] === undefined) {
            inOutCount[e[1]] = {in:new Set(), out:new Set()}
        } 
        inOutCount[e[0]].out.add(e[1])
        inOutCount[e[1]].in.add(e[0])
        noIns.delete(e[1])
    }
    var stack = Array.from(noIns);
    var edgeCount = edges.length;
    var order = [];
    console.log(inOutCount, stack);
    while (stack.length>0) {
        var vert = stack.pop();
        order.push(vert);
        if (inOutCount[vert] !== undefined) {
            for (var dest of inOutCount[vert].out) {
                inOutCount[dest].in.delete(vert)
                if (inOutCount[dest].in.size === 0) {stack.push(dest)}
                edgeCount--
            }
        }
    }
    console.log(order)
    return edgeCount > 0 ? false : true
}

const tests = [
    {v:2, edges:[[1,0]], out:true },
    {v:5, edges:[[2, 3], [2, 0], [0, 1], [0, 3], [1, 3], [1, 4], [3, 4]], out:true},
    {v:4, edges:[[3,0],[0,1]], out:true},
    {v:4, edges:[[3,0],[0,1], [2, 1]], out:true},
    {v:4, edges:[[3,0],[0,1], [2, 1], [1, 2]], out:false}
];

tests.forEach((t, i) => console.log('test', i, topOrder(t.v, t.edges), 'should be', t.out))