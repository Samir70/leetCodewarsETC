const { testQ1, testQ2, testQ3, testQ4, testQ5 } = require('./3-theLiftTests');

const findHighestWithDowner = (q) => {
    for (var i = q.length; i>0; i--) {
      if (q[i] && q[i].some(person => person<i)) {return i}
    }
    return null
}

const findLowestWithUpper = (q) => {
    for (var i = 0; i<q.length; i++) {
      if (q[i] && q[i].some(person => person>i)) {return i}
    }
    return null
}

const findNextWithDowner = (q, cf) => {
  for (var i = cf; i>0; i--) {
    if (q[i].some(e => e < cf)) { return i }
  }
  return -Infinity
}

const findNextWithUpper = (q, cf) => {
  for (var i = cf; i<q.length; i++) {
    if (q[i].some(e => e > cf)) { return i }
  }
  return Infinity
}

const countQs = (q) => q.reduce((a, b) => a+b.length, 0)


const nextStop = (passengers, d) => d === 'UP' ? Math.min(...passengers) : Math.max(...passengers);
const kickOut = (guests, floor) => guests.filter(g => g===floor);
const canBoard = (floor, waiting, direction) => 
   waiting.filter(w => direction === 'UP' ? w>floor : w<floor);
const removeSubset = (q, subQ) => {
    var workQ = [...q];
    subQ.forEach(e => workQ[workQ.indexOf(e)] = -1);
    return workQ.filter(x => x>=0)
}

var currentFloor = 0;
var currentPassengers = [];
var direction = 'UP';
var liftStoppedAt = [0];

const displaySituation = (q, cap) => {
  console.log(
    'highest with downer', findHighestWithDowner(q), 
    '\nlowest with upper', findLowestWithUpper(q),
    '\nThe queues are', q,
    '\nThere are ', countQs(q), 'people waiting',
    '\ncurrently on lift', currentPassengers, 'with room for', cap,
    '\nlift is on floor', currentFloor, 'going', direction,
    '\nthe next passenger stop is', nextStop(currentPassengers, direction),
    '\nThe lift has visited floors', liftStoppedAt,
    '\n----------'
  ) 
}

var theLift = function(queues, capacity) {
  displaySituation(queues, capacity);
  if ( currentPassengers.length === 0 && countQs(queues) === 0 ) {
     if (currentFloor !== 0) {liftStoppedAt.push(0)}; 
    console.log("We're done!!!", liftStoppedAt);
    // reset variables so function can be called again on codeWars
    var temp = liftStoppedAt;
    liftStoppedAt = [0];
    currentFloor = 0;
    direction = 'UP';
    return temp;
  } 
  if (currentPassengers.length === 0) {
    var [lwu, hwd] = [findLowestWithUpper(queues), findHighestWithDowner(queues)];
    currentFloor = hwd !== null ? hwd : lwu;
    direction = hwd !== null ? 'DOWN' : 'UP';
  } else {
    currentFloor = direction === 'UP' ? 
      Math.min( nextStop(currentPassengers, direction), findNextWithUpper(queues, currentFloor+1) ) :
      Math.max( nextStop(currentPassengers, direction), findHighestWithDowner(queues, currentFloor-1) )    
  }
  console.log('lift has gone to', currentFloor);
  liftStoppedAt.push(currentFloor);
  var gettingOff = kickOut(currentPassengers, currentFloor);
  console.log('on this floor, the following will disembark:', gettingOff);
  currentPassengers = removeSubset(currentPassengers, gettingOff);
  console.log('can board are the first', capacity-currentPassengers.length,  'of', canBoard(currentFloor, queues[currentFloor], direction));
  var boarding = canBoard(currentFloor, queues[currentFloor], direction).slice(0, capacity-currentPassengers.length)
  currentPassengers = currentPassengers.concat(...boarding);
  queues[currentFloor] = removeSubset(queues[currentFloor], boarding);
  return theLift(queues, capacity)
}

console.log('In the end: ', theLift(testQ5, 5));
