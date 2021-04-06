/**
 * [1] = 0 operations
 * [1, 3] = 1 operation
 * [1, 3, 5] = 0 + 2 operations
 * [1, 3, 5, 7] = 3+1 operations
 * [1, 3, 5, 7, 9] = 4+2 operations
 * [1, 3, 5, 7, 9, 11] = 5 + 3 + 1 operations
 */
const minOperations = n => {
    if (n % 2 === 0) {
        // number of ops are 1, 3, 5, ..., n-1
        // biggest numOfOps = (2(n-1) + 1 - 1)/2 = n - 1;
        // total number of ops = (biggest + smallest) * n/4
        return n * n / 4
    }
    // number of ops = 2, 4, 6, ..., 
    // biggest number of ops = n - 1
    // total = (n - 1 + 2) * (n-1)/4 = (n+1)(n-1)/4
    return (n + 1) * (n - 1) / 4
}