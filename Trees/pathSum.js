// recursive version 
// 104 ms, faster than 55.10% 
// 42.7 MB, less than 96.42%
var pathSum3 = function(root, targetSum, canSkip = true) {
    if (root === null) {return 0}
    let ways = 0;
    if (root.val === targetSum) {ways++}
    ways += pathSum(root.left, targetSum - root.val, false)
    ways += canSkip ? pathSum(root.left, targetSum, canSkip) : 0
    ways += pathSum(root.right, targetSum - root.val, false)
    ways += canSkip ? pathSum(root.right, targetSum, canSkip) : 0
    // console.log({root, targetSum, canSkip, ways})
    return ways
};
// below also worked, without propogating canSkip
var pathSum3b = function(root, sum, allowSkip = true) {
    if (root === null) return 0
    let out = 0
    if (root.val === sum) {
        out++ // short path!
    }
    // use the root
    out += pathSum3b(root.left, sum - root.val, false)
    out += pathSum3b(root.right, sum - root.val, false)
    // don't use the root
    if (allowSkip) {
        out += pathSum3b(root.left, sum)
        out += pathSum3b(root.right, sum)
    }
    return out
};

// 96 ms, faster than 37.19%
// 49.6 MB, less than 25.93%
var pathSum2 = function(root, targetSum) {
    if (root === null) {return []}
    let paths = []
    const helper = (n, path, sum) => {
        path.push(n.val);
        sum += n.val
        // console.log({path, sum})
        if (sum === targetSum && n.left === null && n.right === null) {
            paths.push(path)
            return null
        }
        if (n.left) {
            helper(n.left, [...path], sum)
        }
        if (n.right) {
            helper(n.right, [...path], sum)
        }
    }
    helper(root, [], 0)
    return paths
};
