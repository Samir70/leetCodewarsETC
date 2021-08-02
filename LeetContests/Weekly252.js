const threes = new Set([2,3,5,7,11,13,17,19,23,29,31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83,87,89,93,97].map(p => p*p))
var isThree = function(n) {    
    return threes.has(n)
};


var numberOfWeeks = function(milestones) {
    let max = Math.max(...milestones)
    let sum = milestones.reduce((acc, val) => acc+val, 0) - max;
    return max <= sum ? max+sum : 2*sum + 1
};



var minimumPerimeter = function(need) {
    if (need === 0) {return 0}
    let topTrees = 3, topRow = 5, corners = 2, perim = 8;
    let apples = 12
    while (need > apples) {
        corners += 2
        topRow += topTrees; topTrees += 2
        apples += 4*topRow + 4*corners
        topRow += 2*corners
        perim += 8
        // console.log(perim, apples)
    }
    return perim
};