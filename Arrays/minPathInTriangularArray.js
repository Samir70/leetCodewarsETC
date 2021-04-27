// 91%, 43%
var minimumTotal = function(triangle) {
    let rows = triangle.length;
    for (let r = 1; r < rows; r++) {
        triangle[r][0] += triangle[r-1][0]
        let len = triangle[r].length;
        for (let i = 1; i < len - 1; i++) {
            let cur = triangle[r][i]
            triangle[r][i] = Math.min(cur + triangle[r-1][i], cur + triangle[r-1][i-1])
        }
        triangle[r][len-1] += triangle[r-1][len-2]
        // console.log(triangle)
    }
    return Math.min(...triangle[rows - 1])
};
