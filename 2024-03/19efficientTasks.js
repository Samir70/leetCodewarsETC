/**
 * Greedy
 */
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
  for (t in tally) { nums.push(tally[t]) }
  var max = Math.max(...nums);
  var count = nums.reduce((a, b) => b === max ? a + 1 : a, 0)
  // console.log(tally, nums, max, count);
  /**
   * nums can be reduced in rounds. 
   * If the most common task occurs max times, we need at least max rounds
   * In each round I have to decrease at least n elements (or be idle), except possibly the last round
   * worst case I have AAAAAABBBBBB
   * A(n rests)A(n rests)....AB
   * And the answer is longer than the task list
   */
  var worst = (max - 1) * (n + 1) + count
  if (worst >= tasks.length) { return worst }
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

var tests = [
  { args: ["AAAAAABBBBBBCCCCCCDDDDDDEEEEEE", 3], out: 30 },
  { args: ["AAAAAABBBBBBCCCCCCDDDDDDEEEEEEFFFFGGGG", 3], out: 38 },
  { args: ["AAAAAABBBBBCCC", 2], out: 16 },
  { args: ["AAAAAABBBBBCCCC", 2], out: 16 },
  { args: ["AAAAAABCDEFGH", 2], out: 16 },
  { args: ["YYYZZZUUDYYYEEYLLWZY", 2], out: 22 },
  { args: ["AAABBB", 2], out: 8 },
];

tests.forEach((t, i) => {
  let res = leastInterval(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});

