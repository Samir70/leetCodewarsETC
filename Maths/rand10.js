// Aim is to make a function which picks a random int 1..10
// can't use the Math.random() function, but given a rand7() function that return 1..7

// see results below, was suffiecient to pass
var rand10 = function() {
    // pick two numbers from rand7(); 49 possible pairs
    // multiply together; 25 possible annswers
    // pick 4 pairs to assign to each of 1..10, 
    // other nine pairs redo and hope to get a useable pair eventually!
    
    const mapping = {
        6 : 1, 
        12: 2,
        2 : 3, 3 : 3, // each come up twice
        7 : 4, 8 : 4,
        10: 5, 14: 5,
        15: 6, 18: 6,
        20: 7, 21: 7,
        24: 8, 30: 8,
        28: 9, 35: 9,
        42: 10, 5: 10
        // leaving the nine pairs which score 4, 1, 9, 16, 25, 36, 49
        // (4 comes up with 3 pairs)
    }
    let chosen = 0; limit = 0;
    while (chosen === 0 && limit < 30) {
        let num1 = rand7(), num2 = rand7();
        let prod = num1 * num2;
        if (mapping[prod] !== undefined) {chosen = mapping[prod]}
        limit++ // small chance of 0 being chosen
    }
    return chosen
};

originally did on leetCode:
let hundredTries = [];
for (let i = 0; i<100; i++) {
  hundredTries.push(rand10())
}

let tally = {}
hundredTries.forEach(t => {
  if (tally[t] === undefined) {tally[t] = 0}
  tally[t]++
}); 
console.log('tally:', tally);

/* got
tally: {
  '1': 7,
  '2': 10,
  '3': 13,
  '4': 20,
  '5': 13,
  '6': 11,
  '7': 10,
  '8': 7,
  '9': 4,
  '10': 5
}

tally: {
  '1': 6,
  '2': 3,
  '3': 12,
  '4': 7,
  '5': 10,
  '6': 13,
  '7': 15,
  '8': 10,
  '9': 13,
  '10': 11
}
*/
