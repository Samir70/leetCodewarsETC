var kthSmallest = function(matrix, k) {
    let n = matrix.length;
    if (k === 1) {return matrix[0][0]}
    if (k === n * n) {return matrix[n - 1][n - 1]}
    // wanted number is between the top left and bottom right
    let lo = matrix[0][0], hi = matrix[n-1][n-1];
    while (lo < hi) {
        let mid = Math.floor((lo + hi)/2);
        let count = 0, j = n - 1;
        for (let i = 0; i < n; i++) {
            while (j >= 0 && matrix[i][j] > mid) {j--}
            count += j+1
        }
        if (count < k) {
            lo = mid+1
        } else {
            hi = mid
        }        
    }
    return lo
};