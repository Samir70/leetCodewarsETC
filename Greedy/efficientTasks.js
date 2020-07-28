// since tasks are A-Z, it's faster to use an Array(26) and convert task to number in alphabet
// use from charCodeAt()
var leastInterval = function (tasks, n) {
    if (n === 0) { return tasks.length }
    var tally = {};
    for (var t of tasks) {
        if (tally[t] === undefined) { tally[t] = 0 }
        tally[t]++
    };
    var nums = []
    for (t in tally) {nums.push(tally[t])}
    var max = Math.max(...nums);
    var count = nums.reduce((a, b) => b === max ? a+1 : a, 0)
    // console.log(tally, nums, max, count);
    /**
     * nums can be reduced in rounds. 
     * If the most common task occurs max times, we need at least max rounds
     * In each round I have to decrease at least n elements (or be idle), except possibly the last round
     * worst case I have AAAAAABBBBBB
     * A(n rests)A(n rests)....AB
     * And the answer is longer than the task list
     */
    var worst = (max-1)*(n+1) +count
    if (worst >= tasks.length) {return worst}
    // if task list is longer than this, then I can pad out some of the rounds
    // with less frequent tasks and will need no idle time
    return tasks.length
};

/**
 * Python is short and sweet
 * def leastInterval(self, tasks, N):
    task_counts = collections.Counter(tasks).values()
    M = max(task_counts)
    Mct = task_counts.count(M)
    return max(len(tasks), (M - 1) * (N + 1) + Mct)s
 */

// const tasks = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// var taskList = n => {
//     var out = '';
//     for (var i = 0; i < n; i++) {
//         var task = tasks[Math.floor(Math.random() * 26)]
//         out += Array(Math.floor(Math.random() * 3) + 1).fill(task).join('')
//     }
//     return out
// };

// var tests = [...Array(10)].map(x => {
//     return {
//         tasks: taskList(10), n: Math.floor(Math.random() * 5)
//     }
// });

// tests.forEach((t, i) => console.log(
//     '{tasks: "', t.tasks, '", n:', t.n, '}'
// ));

var tests2 = [
    { tasks: "AAAAAABBBBBBCCCCCCDDDDDDEEEEEE", n: 3, out:30 },
    { tasks: "AAAAAABBBBBBCCCCCCDDDDDDEEEEEEFFFFGGGG", n: 3, out:38 },
    { tasks: "AAAAAABBBBBCCC", n: 2, out:16 },
    { tasks: "AAAAAABBBBBCCCC", n: 2, out:16 },
    { tasks: "AAAAAABCDEFGH", n: 2, out:16 },
    { tasks: "YYYZZZUUDYYYEEYLLWZY", n: 2, out:22 },
    { tasks: "AAABBB", n: 2, out:8 },
    // { tasks: "NZZZZZOMPXXZZPZZZRR", n: 3 },
    // { tasks: "BNNNEEAAARRHHUUUWWWSSR", n: 0 },
    // { tasks: "GSLLCCNNNPPQLQQQ", n: 1 },
    // { tasks: "OAZWOOONNLLEZZZRRR", n: 2 },
    // { tasks: "HDDMMFFTTHHPPPZGGBBB", n: 4 },
    // { tasks: "OOOBHHHCCCZGGGUUUKKKPDD", n: 4 },
    // { tasks: "EEEFFQQRRROKOOORMSSS", n: 3 },
    // { tasks: "BOXXAAAIILUUUAAAVZZZ", n: 4 }
];

tests2.forEach((t, i) => console.log(
    // t.tasks.split('').join('","'), t.n,
    'test', i, leastInterval(t.tasks.split(''), t.n), 'should be', t.out
))

