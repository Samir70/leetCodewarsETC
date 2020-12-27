var countStudents = function (students, sandwiches) {
    let count = [0, 0];
    for (let s of students) { count[s]++ }
    let i = 0;
    while (i < sandwiches.length) {
        let s = sandwiches[i];
        if (count[s] === 0) {
            // can't serve this sandwich
            return count[(s+1)%2]
        }
        count[s]--
        console.log(i, s, 'count', count)
        i++;
    }
    return 0
};

const tests = [
    { students: [1, 1, 0, 0], sandwiches: [0, 1, 0, 1], out: 0 },
    { students: [1, 1, 1, 0, 0, 1], sandwiches: [1, 0, 0, 0, 1, 1], out: 3 }
]

tests.forEach((t, i) => console.log(
    'test', i, countStudents(t.students, t.sandwiches), 'should be', t.out
))