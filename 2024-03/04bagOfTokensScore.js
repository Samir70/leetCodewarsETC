const bagOfTokensScore1 = (tokens, power) => {
  if (tokens.length === 0) { return 0 }
  tokens.sort((a, b) => a - b);
  let canPlay = true;
  let low = 0, high = tokens.length - 1;
  let maxScore = 0, score = 0;
  while (canPlay) {
    if (power < tokens[low] && score === 0) { return maxScore }
    if (power >= tokens[low]) {
      power -= tokens[low];
      low++;
      score++;
      maxScore = Math.max(maxScore, score)
      if (low > high) { canPlay = false }
    } else {
      power += tokens[high];
      high--;
      score--;
    }
  }
  return maxScore
}

// There needs to be a better way
const bagOfTokensScore2 = (tokens, power) => {
  tokens.sort((a, b) => a - b);
  let score = 0, maxScore = 0;
  let low = 0, high = tokens.length - 1;
  while (low <= high) {
    if (power >= tokens[low]) {
      power -= tokens[low];
      low++;
      score++;
      maxScore = Math.max(maxScore, score)
    } else if (score > 0) {
      power += tokens[high]
      score--;
      high--;
    } else { return maxScore }
  }
  return maxScore
}

// beating nearly 95%
const bagOfTokensScore = (tokens, power) => {
  tokens.sort((a, b) => a - b);
  let score = 0;
  let low = 0, high = tokens.length - 1;
  while (low <= high) {
    if (power < tokens[low]) { return score }
    while (low <= high && power >= tokens[low]) {
      power -= tokens[low];
      low++;
      score++;
    }
    if (low < high && score > 0) {
      power += tokens[high]
      score--;
      high--;
    }
  }
  return score
}

const tests = [
  { args: [[100], 50], out: 0 },
  { args: [[100, 200], 150], out: 1 },
  { args: [[100, 200, 300, 400], 200], out: 2 },
  { args: [[], 85], out: 0 },
  { args: [[71, 55, 82], 54], out: 0 }
];

tests.forEach((t, i) => {
  let res = bagOfTokensScore2(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});