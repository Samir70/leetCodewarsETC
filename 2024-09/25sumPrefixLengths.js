class trieNode {
  constructor(name) {
    this.key = name;
    this.children = {};
    this.wordEnd = false
    this.tally = 0
  }
}

class Trie {
  constructor() {
    this.head = {
      val: null,
      children: {}
    }
  }

  insert(word) {
    var current = this.head;
    for (var w of word) {
      if (current.children[w] === undefined) {
        current.children[w] = new trieNode(w)
      }
      current = current.children[w]
      current.tally += 1
    }
    current.wordEnd = true;
  }

  search(word) {
    var current = this.head;
    let sum = 0
    for (let i = 0; i < word.length; i++) {
      let w = word[i]
      // console.log(`${i} looking for ${w} res: ${current.children[w]}`)
      if (current.children[w] === undefined) { return 0 }
      current = current.children[w]
      sum += current.tally
    }
    return sum
  }
}
/**
 * @param {string[]} words
 * @return {number[]}
 */
var sumPrefixScores = function (words) {
  let trie = new Trie()
  for (let w of words) {
    trie.insert(w)
  }
  //  console.log(tally)
  let out = []
  for (let w of words) {
    out.push(trie.search(w))
  }
  return out
};


const { bigtest, bigAns } = require("./25bigtest")
const tests = [
  { args: [["abc", "ab", "bc", "b"]], out: [5, 4, 3, 2] },
  { args: [["abcd"]], out: [4] },
  { args: [bigtest], out: bigAns },
];

tests.forEach((t, i) => {
  let res = sumPrefixScores(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});