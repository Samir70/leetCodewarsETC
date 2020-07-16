var minNumberOfSemesters = function (n, dependencies, k) {
    var noDeps = new Set([...Array(n)].map((x, i) => x = i + 1));
    var insAndOuts = {}
    for (var i = 1; i <= n; i++) {
        insAndOuts[i] = { in: new Set(), out: new Set() }
    }
    for (var d of dependencies) {
        var f = d[0], t = d[1];
        insAndOuts[f].out.add(t)
        insAndOuts[t].in.add(f);
        noDeps.delete(t)
    }
    var canStudy = [...noDeps];
    var studied = [];
    var semester = 0;
    while (studied.length < n && canStudy.length > 0) {
        semester++;
        var c = k;
        canStudy.sort((a, b) => insAndOuts[a].out.size - insAndOuts[b].out.size)
        var newCanStudy = []
        while (c > 0 && canStudy.length > 0) {
            var course = canStudy.pop();
            // console.log('semester, course', semester, course)
            studied.push(course);
            // if (insAndOuts[course] === undefined) {insAndOuts[course] = {out: new Set()}}
            var pointsTo = insAndOuts[course].out
            for (var dest of pointsTo) {
                // console.log('dest, its ins', dest, insAndOuts[dest].in)
                insAndOuts[dest].in.delete(course)
                if (insAndOuts[dest].in.size === 0) { newCanStudy.push(dest) }
            }
            c--
        }
        canStudy = canStudy.concat(newCanStudy)
        // console.log('after concat', canStudy)
    }
    console.log(studied)
    return semester
};

var minNumberOfSemesters2 = function(n, dependencies, k) {
    let courseMap = [...Array(n)].map(() => []), degrees = new Array(n).fill(0);
    
    for (let [pre, next] of dependencies) {
        degrees[next-1]++;
        courseMap[pre-1].push(next-1);
    }
    
    let queue = [];
    for (let i = 0; i < n; i++) {
        if (degrees[i] == 0)
            queue.push(i);
    }

    //  use sort to optimize the max number of courses can be taken in the next semester
    queue.sort((a,b) => courseMap[b].length - courseMap[a].length);
    
    let res = 0, availableCourses = k;
	
	// Outer while loop can count the semester
	// Inner while loop to make sure the max number course can be taken in current semester
    while (queue.length) {
        let next = [];
        res++;
        availableCourses = k;
        while (availableCourses > 0 && queue.length) {
            let cur = queue.shift();
            
            availableCourses--;
            
            for (let n of courseMap[cur]) {
                degrees[n]--;
                if (degrees[n] == 0)
                    next.push(n);
            }
        }
        queue = queue.concat(next);
		// Don't forget to use sort to maximum number of courses in the future semester
        queue.sort((a,b) => courseMap[b].length - courseMap[a].length);
    }
    
    return res;
};

const tests = [
    { n: 6, dep: [[2, 5], [1, 5], [3, 5], [3, 4], [3, 6]], k: 2, out: 3 },
    {
        n: 10,
        dep: [[1, 5], [1, 6], [1, 7], [2, 5], [2, 6], [2, 7], [9, 10], [10, 5], [10, 6], [10, 7], [10, 8], [3, 5], [3, 6], [4, 5], [4, 6]],
        k: 2, out: 5
    },
    //(credit to @ddoudle)
    { n: 9, dep: [[1, 4], [1, 5], [3, 5], [3, 6], [2, 6], [2, 7], [8, 4], [8, 5], [9, 6], [9, 7]], k: 3, out: 3 },
    //(credit to @s_tsat)
    { n: 12, dep: [[1, 2], [2, 3], [4, 5], [5, 6], [7, 8], [8, 9], [10, 11], [11, 12]], k: 3, out: 4 },
    //(credit to @changeme)
    { n: 6, dep: [[2, 1], [5, 1], [3, 1], [3, 4], [3, 6]], k: 2, out: 3 },
    { n: 4, dep: [[2, 1], [4, 3], [1, 3], [2, 3]], k: 4, out: 3 },
    { n: 8, dep: [[1, 6], [2, 7], [8, 7], [2, 5], [3, 4]], k: 3, out: 3 },
    { n: 4, dep: [[2, 1], [3, 1], [1, 4]], k: 2, out: 3 },
    { n: 5, dep: [[2, 1], [3, 1], [4, 1], [1, 5]], k: 2, out: 4 },
    { n: 11, dep: [], k: 2, out: 6 }
];

tests.forEach((t, i) => console.log(
    'test', i, minNumberOfSemesters2(t.n, t.dep, t.k), 'should be', t.out
))