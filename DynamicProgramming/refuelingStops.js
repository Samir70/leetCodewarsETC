// 96ms beating 92%
var minRefuelStops = function(target, startFuel, stations) {
    if (startFuel >= target) {return 0}
    // dist[i] = distance you can get with i stops
    let dist = Array(stations.length+1).fill(0)
    dist[0] = startFuel
    for (let i = 0; i < stations.length; i++) {
        let [d, f] = stations[i];
        for (let prev = i; prev >= 0; prev--) {
            if (d <= dist[prev]) {
                dist[prev+1] = Math.max(dist[prev+1], dist[prev] + f)
            } else {
                break
            }
        }
        // console.log(dist.join(','))
    }
    for (let i = 1; i < dist.length; i++) {
        if (dist[i] >= target) {return i}
    }
    return -1
};

/**
 * use a heap
 * When driving past a gas station, 
 * let's remember the amount of fuel it contained. 
 * We don't need to decide yet whether to fuel up here or not 
 * - for example, there could be a bigger gas station up ahead that we would rather refuel at.
 * When we run out of fuel before reaching the next station, 
 * we'll retroactively fuel up: greedily choosing the largest gas stations first.
 */

const tests = [
    { target: 1, startFuel: 1, stations: [] },
    { target: 100, startFuel: 10, stations: [[10, 60], [20, 30], [30, 30], [60, 40]] },
    { target: 100, startFuel: 50, stations: [[50, 50]] },
    { target: 1000, startFuel: 83, stations: [[47, 220], [65, 1], [98, 113], [126, 196], [186, 218], [320, 205], [686, 317], [707, 325], [754, 104], [781, 105]] },
    { target: 1000, startFuel: 83, stations: [[25, 27], [36, 187], [140, 186], [378, 6], [492, 202], [517, 89], [579, 234], [673, 86], [808, 53], [954, 49]] }
]