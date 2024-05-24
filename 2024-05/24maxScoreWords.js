/**
 * @param {string[]} words
 * @param {character[]} letters
 * @param {number[]} score
 * @return {number}
 */
const letterIdx = char => char.charCodeAt(0) - "a".charCodeAt(0)
var maxScoreWords = function (words, letters, score) {
  let tallyLetters = Array(26).fill(0)
  for (let c of letters) {
    tallyLetters[letterIdx(c)] += 1
  }
  const canMakeWord = (word) => {
    let usedLetter = Array(26).fill(0)
    for (let c of word) {
      let idx = letterIdx(c)
      if (tallyLetters[idx] > usedLetter[idx]) {
        usedLetter[idx]++
      } else {
        return false
      }
    }
    return true
  }

  const useLetters = (word) => {
    for (let c of word) {
      tallyLetters[letterIdx(c)]--
    }
  }
  const putLettersBack = (word) => {
    for (let c of word) {
      tallyLetters[letterIdx(c)]++
    }
  }
  const scoreForWord = (word) => {
    let out = 0
    for (let c of word) {
      out += score[letterIdx(c)]
    }
    return out
  }
  const makeWords = (wordIdx, scoreSoFar) => {
    if (wordIdx >= words.length) { return scoreSoFar }
    let skip = makeWords(wordIdx + 1, scoreSoFar)
    let useWordScore = 0, word = words[wordIdx]
    if (canMakeWord(word)) {
      useLetters(word)
      useWordScore = makeWords(wordIdx + 1, scoreSoFar + scoreForWord(word))
      putLettersBack(word)
    }
    return Math.max(skip, useWordScore)
  }
  return makeWords(0, 0)
};

const tests = [
  {
    args: [
      ["dog", "cat", "dad", "good"],
      ["a", "a", "c", "d", "d", "d", "g", "o", "o"],
      [1, 0, 9, 5, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ], out: 23
  },
  {
    args: [
      ["xxxz", "ax", "bx", "cx"],
      ["z", "a", "b", "c", "x", "x", "x"],
      [4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 10]
    ], out: 27
  },
  {
    args: [
      ["leetcode"],
      ["l", "e", "t", "c", "o", "d"],
      [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
    ], out: 0
  },
];

tests.forEach((t, i) => {
  let res = maxScoreWords(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});