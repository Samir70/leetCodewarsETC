var sumOfUnique = function(nums) {
    let unique = new Set()
    let all = new Set()
    let sum = 0
    for (let n of nums) {
        if (all.has(n)) {
            unique.delete(n)
        } else {
            unique.add(n)
        }
        all.add(n)
    }
    for (let n of unique) {
        sum += n
    }
    return sum
};