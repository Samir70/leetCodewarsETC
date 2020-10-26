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
    let low = 0, high = tokens.length-1;
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
        } else {return maxScore}
    }
    return maxScore
}

// beating nearly 95%
const bagOfTokensScore = (tokens, power) => {
    tokens.sort((a, b) => a - b);
    let score = 0;
    let low = 0, high = tokens.length-1;
    while (low <= high) {
        if (power < tokens[low]) {return score}
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
    { tokens: [100], p: 50, out: 0 },
    { tokens: [100, 200], p: 150, out: 1 },
    { tokens: [100, 200, 300, 400], p: 200, out: 2 },
    { tokens: [], p: 85, out: 0 },
    { tokens: [71, 55, 82], p: 54, out: 0 }
];

tests.forEach((t, i) => console.log(
    'test', i, bagOfTokensScore(t.tokens, t.p) === t.out
))