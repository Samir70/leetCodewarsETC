// given list of co-ordinates, determine if it is a straight line
// found it easy, but runtime 62%

const checkStr8 = (arr) => {
    if (arr.length === 2) {return true}
    const gradients = arr.slice(1).map(x => (arr[0][1]-x[1]) / (arr[0][0]-x[0]));
    console.log(gradients);
    return gradients.every(x => x === gradients[0])
}

const tests = [
    [[1,1],[2,2],[3,4],[4,5],[5,6],[7,7]],
    [[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]]
]

tests.forEach(t => console.log(checkStr8(t)))