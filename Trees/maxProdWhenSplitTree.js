// Very slow: 204ms beats 6%
var maxProduct = function(root) {
    const treeSum = r => {
        let sum = BigInt(r.val)
        if (r.left) {sum += treeSum(r.left)}
        if (r.right) {sum += treeSum(r.right)}
        r.sum = sum
        return sum
    }
    
    let total = BigInt(treeSum(root))
    let stack = [root];
    let max = 0n
    
    while (stack.length) {
        let cur = stack.pop()
        let sum1 = cur.sum, sum2 = total - sum1
        let prod = sum1 * sum2
        if (prod > max) {max = prod}
        // console.log(sum1, sum2, prod, max)
        if (cur.left) {stack.push(cur.left)}
        if (cur.right) {stack.push(cur.right)}
    }
    
    return max % BigInt(10**9 + 7)
};
