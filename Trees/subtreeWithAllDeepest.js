/**
 * Using an Eulerian path
 * rowe1227
 https://leetcode.com/problems/smallest-subtree-with-all-the-deepest-nodes/discuss/969164/Python-BFS-and-Euler-Path-with-picture
 */

// speed, mem: 71%, 100%            
const subtreeWithAllDeepest = root => {
    let depth = [], path = [];
    const eulerianPath = (n, d) => {
        path.push(n); depth.push(d);
        if (n.left) {
            eulerianPath(n.left, d+1);
            path.push(n); depth.push(d)
        }
        if (n.right) {
            eulerianPath(n.right, d+1);
            path.push(n); depth.push(d)
        }
    } 
    eulerianPath(root, 0);
    // console.log(path.map(x => x.val), depth);
    let maxD = 0, minD = 0, out = 0;
    for (let i = 1; i<depth.length; i++) {
        if (depth[i] > depth[maxD]) {
            maxD = i; minD = i; out = i
        } else if (depth[i] === depth[maxD]) {
            out = minD
        } else if (depth[i] < depth[minD]) {
            minD = i
        }   
    }
    return path[out]
}