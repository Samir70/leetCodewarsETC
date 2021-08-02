const threes = new Set([2,3,5,7,11,13,17,19,23,29,31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83,87,89,93,97].map(p => p*p))
var isThree = function(n) {    
    return threes.has(n)
};
