// using a kind of bucket sort
// 80ms, beats 88%
/*
You are driving a vehicle that has _capacity empty seats initially available for passengers.  
The vehicle only drives east (ie. it cannot turn around and drive west.)

Given a list of trips, trip[i] = [num_passengers, start_location, end_location] contains information about the i-th trip: 
the number of passengers that must be picked up, and the locations to pick them up and drop them off.  
The locations are given as the number of kilometers due east from your vehicle's initial location.

Return true if and only if it is possible to pick up and drop off all passengers for all the given trips. 
*/

var carPooling = function(trips, capacity) {
    let stops = Array(1001).fill(0);
    for (let t of trips) {
        stops[t[1]] += t[0];
        stops[t[2]] -= t[0];
    }
    let inCar = 0;
    for (let i = 0; i<1001; i++) {
        inCar += stops[i]
        if (inCar > capacity) {return false}
    }
    return true
};

// look here for optimization:
// https://leetcode.com/problems/car-pooling/discuss/857640/C%2B%2B-DP-no-Sorting-Solution-Explained-~98-Time-~65-Space

const tests = [
 {trips : [[2,1,5],[3,3,7]], capacity : 4, out: false},
{ trips : [[2,1,5],[3,3,7]], capacity : 5, out: true},
{ trips : [[2,1,5],[3,5,7]], capacity : 3, out: true},
{trips: [[3,2,7],[3,7,9],[8,3,9]], capacity = 11, out: true}
]
