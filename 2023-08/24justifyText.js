/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
const justifyLine = (words, width) => {
  let gaps = words.length - 1;
  if (gaps === 0) {
    let out = words[0];
    while (out.length < width) {out += " "}
    return out
  }
  let chars = words.reduce((a, c) => a + c.length, 0)
  let gapLength = 1
  while (chars + gaps * gapLength < width) { gapLength++ }
  gapLength--
  let numGapsWithExtraSpace = width - (chars + gaps * gapLength);
  let gap = Array(gapLength).fill(" ").join("")
  let out = ""
  // console.log({words, gaps, gapLength, numGapsWithExtraSpace, chars})
  for (let i = 0; i < words.length - 1; i++) {
    let word = words[i]
    out += word + gap;
    if (numGapsWithExtraSpace > 0) {
      out += " ";
      numGapsWithExtraSpace--
    }
  }
  out += words[words.length - 1]
  return out
}
var fullJustify = function (words, maxWidth) {
  let out = [], i = 0
  while (i < words.length) {
    let len = 0, line = [], word = words[i]
    while (i < words.length && len + word.length <= maxWidth) {
      line.push(word)
      len += word.length
      if (len < maxWidth) { len++ }
      i++;
      word = words[i]
    }
    out.push(line)
  }
  for (let i = 0; i < out.length - 1; i++) {
    out[i] = justifyLine(out[i], maxWidth)
  }
  out[out.length - 1] = justifyLine([out[out.length - 1].join(" ")], maxWidth)
  return out
};

const tests = [
  {
    args: [["This", "is", "an", "example", "of", "text", "justification."], 16,], out: [
      "This    is    an",
      "example  of text",
      "justification.  "
    ]
  },
  {
    args: [["What", "must", "be", "acknowledgment", "shall", "be"], 16,], out: [
      "What   must   be",
      "acknowledgment  ",
      "shall be        "
    ]
  },
  {
    args: [["Science", "is", "what", "we", "understand", "well", "enough", "to", "explain", "to", "a", "computer.", "Art", "is", "everything", "else", "we", "do"], 20,], out: [
      "Science  is  what we",
      "understand      well",
      "enough to explain to",
      "a  computer.  Art is",
      "everything  else  we",
      "do                  "
    ]
  },
];

tests.forEach((t, i) => {
  let res = fullJustify(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});