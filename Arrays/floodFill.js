// testcase where newColour was the same as the original color caused an infinite loop
// First version used beenTo to keep track of squares visited and so avoid an infinite loop, 
// but far easier to check for this condition and just return image if there is nothing to do:

var floodFill1 = function (image, sr, sc, newColor) {
    let originalColour = image[sr][sc];
    if (originalColour === newColor) { return image }
    let stack = [[sr, sc]];
    let dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    while (stack.length > 0) {
        let point = stack.pop();
        let nextSteps = dirs.map(d => [d[0] + point[0], d[1] + point[1]]);
        nextSteps.forEach(s => {
            if (s[0] >= 0 && s[0] < image.length && s[1] >= 0 && s[1] < image[0].length) {
                if (image[s[0]][s[1]] === originalColour) {
                    stack.push(s)
                }
            }
        })
        image[point[0]][point[1]] = newColor
    }
    return image
};

var floodFill = function (image, sr, sc, newColor) {
    let originalCol = image[sr][sc];
    if (originalCol === newColor) { return image }
    let stack = [[sr, sc]];
    let dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    let rows = image.length, cols = image[0].length;
    while (stack.length) {
        let [r, c] = stack.pop();
        if (r < 0 || r >= rows || c < 0 || c >= cols || image[r][c] !== originalCol) { continue }
        image[r][c] = newColor;
        dirs.forEach(d => stack.push([d[0] + r, d[1] + c]))
    }
    return image
};

const tests = [
    {
        image: [[1, 1, 1], [1, 1, 0], [1, 0, 1]], sr: 1, sc: 1, newColor: 2,
        output: [[2, 2, 2], [2, 2, 0], [2, 0, 1]]
    },
    {
        image: [[0, 0, 0], [0, 1, 1]], sr: 1, sc: 1, newColor: 1,
        output: [[0, 0, 0], [0, 1, 1]]
    }
];

tests.forEach(t => console.log(floodFill(t.image, t.sr, t.sc, t.newColor), 'should be:', t.output))
