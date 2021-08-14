 // fails when needing to modifiy a change that is too far in the past.
 var minSpaceWastedKResizing = function(nums, k) {
    const states = [{size:nums[0], idx:0, wasted:0}];
    let changesUsed = 0;
    for (let i = 1; i < nums.length; i++) {
        let newSize = nums[i];
        if (changesUsed < k) {
            let prev = states[changesUsed]
            states.push({size: newSize, idx:i, wasted: prev.wasted})
        }
        for (let j = changesUsed; j >= 0; j--) {
            let extraWaste = newSize > states[j].size ? 
                (i - states[j].idx) * (newSize - states[j].size) :
                states[j].size - newSize
            let wasteOverWriteJthChange = states[j].wasted + extraWaste
            let wasteIfMakeNewChange = j === 0 ? Infinity : states[j-1].wasted
            // console.log(wasteIfMakeNewChange, wasteOverWriteJthChange)
            if (wasteIfMakeNewChange < wasteOverWriteJthChange) {
                states[j] = {size:newSize, idx: i, wasted: wasteIfMakeNewChange}
            } else {
                states[j].size = Math.max(states[j].size, newSize)
                states[j].wasted += extraWaste
            }
        } 
        changesUsed = states.length - 1
        console.log(states)
    }
    let min = Infinity;
    for (let s of states) {
        if (s.wasted < min) {min = s.wasted}
    }
    return min
};

const tests = [
    { arr: [7, 25, 18, 30, 41], k: 1, out: 36 },
    // { arr: [3, 5, 6, 7, 20, 5, 7, 4, 30, 4, 7, 21, 21, 22, 28], k: 3, out: 89 }
]

tests.forEach((t, i) => console.log(
    'test', i, minSpaceWastedKResizing(t.arr, t.k) === t.out
))