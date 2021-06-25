// 84ms beats 83%
const findComp = (comps, el) => {
    if (comps[el] === undefined) {return null}
    while (comps[el] !== el) {el = comps[el]}
    return el
}
var findRedundantConnection = function(edges) {
    let components = {}
    for (let [a, b] of edges) {
        let aHead = findComp(components, a);
        let bHead = findComp(components, b);
        let head = !aHead && !bHead ? a : aHead || bHead
        if (aHead && aHead === bHead) {return [a, b]}
        components[a] = head;
        components[b] = head;
        components[bHead] = head;
        components[aHead] = head;
        // console.log(components)
    }
    return [-1, -1]
};

const tests = [
  {edges: [[1,2],[1,3],[2,3]], out: [2, 3]},
  {edges: [[1,2],[2,3],[3,4],[1,4],[1,5]], out:[1, 4]}
]
