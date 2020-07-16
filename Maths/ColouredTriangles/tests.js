const { reduceRowByRow, makeRandomRow, makeWords } = require('./exportFrom');
const { triangle } = require('./oneShotReduce');


// var  testSuite = [...Array(5)].map((x, i)=>makeRandomRow(i+4));
// testSuite = ['RBRGBRBGGRRRBGBBBGG'];
const testSuite = [...Array(10)].map(x=>makeRandomRow(Math.floor(Math.random()*5000)+2));
var testCases = 0, matchingAnswers = 0; 
testSuite.forEach(x => {
    if (reduceRowByRow(x) === triangle(x)) {
        matchingAnswers++; testCases++;
        if (testCases % 1000 === 0) {
            console.log('Score so far is ', matchingAnswers, 'out of', testCases)
        }
    } else {
        testCases++;
        console.log(x, 'reduces to ', reduceRowByRow(x), '. But by modular gives', triangle(x))
    }
});
console.log('Tried ', testCases, 'found ', matchingAnswers, 'answers that matched.')