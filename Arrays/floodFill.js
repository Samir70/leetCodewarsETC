const floodFill = (image, sr, sc, newColor) => {
    const beenTo = [];
    const originalColor = image[sr][sc];
    const queue = [[sr, sc]];
    const directions = [
        // above, below, left, right
        [-1, 0], [1, 0], [0, -1], [0, 1]
    ];
    while (queue.length > 0) {
        var point = queue.shift();
        beenTo.push(point.join(','));
        console.log('handling square: ', point);
        image[point[0]][point[1]] = newColor;
        directions.forEach(d => {
            const row = point[0]+d[0], col = point[1]+d[1];
            console.log('considering', [row, col].join(','))
            if (image[row] !== undefined) {
                if (!beenTo.includes([row, col].join(','))) {
                    if (image[row][col] === originalColor) {
                        queue.push([row, col]);
                        console.log('added', [row, col].join(','))
                    }
                }
            }
        });
    }
    return image
}

const tests = [
    { image: [[1,1,1],[1,1,0],[1,0,1]], sr: 1, sc: 1, newColor: 2,
        output: [[2,2,2],[2,2,0],[2,0,1]]},
    { image: [[0,0,0],[0,1,1]], sr: 1, sc: 1, newColor: 1, 
        output:[[0, 0, 0], [0, 1, 1]]}
];

tests.forEach(t => console.log(floodFill(t.image, t.sr, t.sc, t.newColor), 'should be:', t.output))